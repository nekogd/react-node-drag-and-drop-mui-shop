import { makeStyles } from "@material-ui/core/styles";
import { theme } from "styles";

export const useCartStyles = makeStyles(() => ({
  dragDropCart: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    border: `1px dashed ${theme.palette.grey[500]}`,
    minHeight: "90vh",
    minWidth: "8rem",
    padding: "2rem",
    paddingTop: "1rem",
    textAlign: "center",
  },
  cartSummaryTable: {
    width: "100%",
  },
}));
