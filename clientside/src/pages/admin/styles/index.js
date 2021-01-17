import { makeStyles } from "@material-ui/core/styles";

export const useAdminStyles = makeStyles(() => ({
  adminWrapper: {
    maxWidth: 1200,
    margin: "20px auto",
  },
  headerHolder: {
    display: "flex",
    justifyContent: "space-between",
  },
  productForm: {
    minWidth: 300,
  },
  formRow: {
    marginBottom: 25,
  },
  formInput: {
    width: "100%",
  },
  formButton: {
    width: "100%",
  },
}));
