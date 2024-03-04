import { createMuiTheme } from '@material-ui/core/styles'
import { blueGrey, lightGreen } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#FF7ED4",
      main: "#6420AA",
      dark: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      light: "#yellow",
      main: "#F9FF21",
      dark: "#pink",
      contrastText: "#000",
    },
    openTitle: "#6420AA",
    protectedTitle: "#6420AA",
    type: "light",
  },
});

  export default theme