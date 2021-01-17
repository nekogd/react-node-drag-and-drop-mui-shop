import { makeStyles } from "@material-ui/core/styles";

export const useShopHeaderStyles = makeStyles(() => ({
  shopTopBarHolder: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
  },
  headerButtonsHolder: {
    display: "flex",
    justifyContent: "flex-end",
  },
  makeOrderButton: {
    marginLeft: 20,
  },
}));
