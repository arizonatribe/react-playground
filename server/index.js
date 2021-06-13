const helmet = require("helmet")
const express = require("express")
const bodyParser = require("body-parser")
const compression = require("compression")
const config = require("./config")
const createMiddleware = require("./middleware")
const createRoutes = require("./routes")
const logger = require("./logger")

const { port, name, version, isProduction, level } = config

logger.setLevel(level)

const { globalErrorHandler, ...restOfMiddleware } = createMiddleware(config, logger)
const routes = createRoutes(restOfMiddleware)

express()
  .use(bodyParser.urlencoded({ extended: false, limit: "6mb" }))
  .use(bodyParser.json({ limit: "6mb" }))
  .use(compression())
  .use(helmet())
  .use("/v1", routes)
  .use(globalErrorHandler)
  .listen(port, "0.0.0.0", () => {
    /* eslint-disable no-console */
    console.log(`🚀 ${name}-${
      isProduction ? "prod" : "dev"
    } (${version}) now running on port ${port}`)
  })
