import { makeStyles } from "@material-ui/core/styles";
import { theme } from "styles";

export const useAppHeaderStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    color: theme.palette.white.main,
    textDecoration: "none",
  },
  listHeader: {
    display: "flex",
    flexDirection: "row",
  },
  link: {
    color: theme.palette.white.main,
    textDecoration: "none",
  },
}));
