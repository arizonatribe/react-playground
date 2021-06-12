import PropTypes from "prop-types"

/**
 * The themed color values
 * @typedef {Object<string, string>} ThemeColors
 * @property {string} textColor The main text color value
 * @property {string} backgroundColor The main background color value
 * @property {string} primary The primary color for the theme
 * @property {string} secondary The secondary color for the theme
 */

/**
 * The app's theme, provided for each component
 *
 * @typedef {Object<string, ThemeColors>} Theme
 * @property {ThemeColors} colors The set of themed color values for the app
 */

export const PropTypesTheme = PropTypes.shape({
  colors: PropTypes.shape({
    textColor: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired
  })
})

export default {
  colors: {
    textColor: "white",
    backgroundColor: "#282c34",
    primary: "#61dafb",
    secondary: "#61dafb"
  }
}
