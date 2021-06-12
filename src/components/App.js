import React from "react"
import styled from "styled-components"

import Link from "./Link"
import Button from "./Button"
import AppLogo from "./AppLogo"
import AppHeader from "./AppHeader"
import { PropTypesTheme } from "../theme"

const StyledApp = styled.div`
  display: block;
  text-align: center;
`

StyledApp.propTypes = {
  theme: PropTypesTheme
}

/**
 * The main component (or entry point) for the React App
 *
 * @function
 * @name App
 * @returns {React.Component} The rendered JSX component
 */
function App() {
  return (
    <StyledApp>
      <AppHeader>
        <AppLogo />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Do you even React, bro?
        </Link>
        <Button>Yes</Button>
        <Button>No</Button>
      </AppHeader>
    </StyledApp>
  )
}

export default App
