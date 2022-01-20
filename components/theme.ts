import { createMuiTheme, } from '@material-ui/core/styles';
import { createTheme, responsiveFontSizes } from '@material-ui/core'
import { red } from '@material-ui/core/colors';

/* COLOR */
const black = '#343a40'
const white = '#F4F4F4'
const background = '#F4F4F4'

/* BREAKPOINTS */
const xl = 1920
const lg = 1280
const md = 960
const sm = 600
const xs = 0

/* SPACING */
const spacing = 8

/* FONT FAMILY */
const fontFamily = [
    'Poppins',
    '"Helvetica Neue"',
    'Arial',
    'Noto Sans JP',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
]

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#19856b',
    },
    secondary: {
      main: '#ff3d00',
      light: '#ff6333',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    common: {
      black: '#343a40',
      white: '#F4F4F4',
    },
    info: {
        main: '#005CAF',
        light: '#0087FC',
        dark: '#00437D',
      },
      success: {
          main: '#00AA90',
          light: '#00F7D2',
          dark: '#007866',
      },
      warning: {
          main: '#FFB11B',
          light: '#FFDB0F',
          dark: '#E8820E',
      },
      tonalOffset: 0.2,
    },
    spacing: spacing,
    breakpoints: {
        values: {
            xl,
            lg,
            md,
            sm,
            xs
        }
    },
    typography: {
        fontFamily: fontFamily.join(','),
    },
    overrides: {
        MuiToolbar: {
            root: {
                justifyContent: 'space-between'
            }
        },
  },
    
});

export default theme;