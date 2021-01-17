import { makeStyles } from "@material-ui/core/styles";

export const useProductStyles = makeStyles(() => ({
  productsHolder: {
    marginBottom: 20,
  },
  productsListHolder: {
    height: "90vh",
    overflowY: "auto",
  },
  productHolder: {
    cursor: "move",
  },
  productCard: {
    minHeight: 150,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  productContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
    height: "100%",
  },
}));
