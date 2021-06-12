import React from "react"
import styled from "styled-components"
import { PropTypesTheme } from "../theme"
import logo from "./logo.svg"

const StyledLogo = styled.img`
  display: block;
  height: 40vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 20s linear;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

StyledLogo.propTypes = {
  theme: PropTypesTheme
}

/**
 * The main logo for the app
 *
 * @function
 * @name AppLogo
 * @returns {React.Component} The rendered JSX component
 */
function AppLogo() {
  return <StyledLogo src={logo} alt="logo" />
}

export default AppLogo
