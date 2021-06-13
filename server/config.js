const pkg = require("./package.json")
const env = require("./env")

/**
 * The application configuration object
 *
 * @typedef {Object<string, number|boolean|string>} ServerConfig
 * @property {string} level The logging threshold level
 * @property {boolean} isProduction Whether or not this application is running in production
 * @property {string} version The semantic version of the application
 * @property {string} name The name of the application
 */
module.exports = {
  name: pkg.name,
  version: pkg.version,
  port: env.PORT,
  level: env.LOG_LEVEL,
  isProduction: env.NODE_ENV === "production"
}
