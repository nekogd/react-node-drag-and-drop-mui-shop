import { createMuiTheme } from "@material-ui/core/styles";
import { COLORS } from "./constants";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.BLUE,
    },
    secondary: {
      main: COLORS.YELLOW,
    },
    white: {
      main: COLORS.WHITE,
    },
    grey: {
      500: COLORS.GREY500,
    },
  },
});
