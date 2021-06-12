import styled from "styled-components"
import { PropTypesTheme } from "../theme"

const StyledHeader = styled.header`
  display: block;
  color: ${p => p.theme?.colors?.textColor};
  background-color: ${p => p.theme?.colors?.backgroundColor};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`

StyledHeader.propTypes = {
  theme: PropTypesTheme
}

export default StyledHeader
