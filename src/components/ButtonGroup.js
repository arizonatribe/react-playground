import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { PropTypesTheme } from "../theme"

const StyledButtonGroup = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  grid-gap: ${p => (p.gap != null ? p.gap : "5%")};
`

StyledButtonGroup.propTypes = {
  gap: PropTypes.string,
  theme: PropTypesTheme
}

StyledButtonGroup.defaultProps = {
  gap: "5%"
}

/**
 * Displays one or more buttons together in a horizontal group, spaced apart by a specified amount,
 *
 * @function
 * @name ButtonGroup
 * @param {string} [gap] The CSS `grid-gap` amount. Can be an amout in pixels, em, rem, or percentage.
 * @param {PropTypes.element} props.children Content to render inside the button (usually a label, but can be another HTML element)
 * @returns {React.Component} The rendered JSX component
 */
function ButtonGroup({ children, gap }) {
  return (
    <StyledButtonGroup gap={gap}>
      {children}
    </StyledButtonGroup>
  )
}

ButtonGroup.propTypes = {
  gap: PropTypes.string,
  children: PropTypes.element.isRequired
}

export default ButtonGroup
