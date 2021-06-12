import styled from "styled-components"
import { PropTypesTheme } from "../theme"

const StyledLink = styled.a`
  display: block;
  color: ${p => p.theme?.colors?.primary};
`

StyledLink.propTypes = {
  theme: PropTypesTheme
}

export default StyledLink
