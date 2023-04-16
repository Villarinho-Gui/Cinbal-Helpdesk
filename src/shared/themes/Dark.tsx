import { createTheme } from '@mui/material'
import { blue, grey } from '@mui/material/colors'

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: '#3A89E6',
      dark: '#4D84E3',
      light: blue[500],

      contrastText: '#ffffff',
    },
    secondary: {
      main: grey[500],
      dark: grey[400],
      light: grey[300],

      contrastText: '#ffffff',
    },
    background: {
      default: '#202124',
      paper: '#303134',
    },
  },
})
