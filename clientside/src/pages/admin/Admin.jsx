import {
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ProductForm, ProductsTable } from "./components";

import { useAdmin } from "./hooks/useAdmin";
import { useAdminStyles } from "./styles";

export const Admin = () => {
  const {
    adminState,
    getAdminProductsRequest,
    addProductTrigger,
    editProductTrigger,
    deleteProductTrigger,
  } = useAdmin();

  const [selectedProductID, setSelectedProductID] = useState(0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  // the modal handlers could also come from hook
  const handleEditProductFormOpen = (productID) => (e) => {
    setSelectedProductID(productID);
    setEditFormVisible(true);
  };

  const handleEditProductFormClose = () => {
    setEditFormVisible(false);
    setSelectedProductID(null);
  };

  const handleAddProductFormOpen = () => {
    setAddFormVisible(true);
  };

  const handleAddProductFormClose = () => {
    setSelectedProductID(null);
    setAddFormVisible(false);
  };

  const handleConfirmDeleteOpen = (productID) => (e) => {
    setSelectedProductID(productID);
    setConfirmDeleteVisible(true);
  };

  const handleConfirmDeleteClose = () => {
    setSelectedProductID(null);
    setConfirmDeleteVisible(false);
  };

  const deleteProductListener = () => {
    deleteProductTrigger(selectedProductID);
  };

  /**
   * initial data fetch
   * be careful when editing because linting disabled for dependency array due to incorrect array
   */
  useEffect(() => {
    getAdminProductsRequest();
    // eslint-disable-next-line
  }, []);

  const classes = useAdminStyles();

  return (
    <Grid container className={classes.adminWrapper}>
      <Grid item xs={12} className={classes.headerHolder}>
        <Typography variant="h5">Admin Panel</Typography>
        <Button
          onClick={handleAddProductFormOpen}
          variant="contained"
          color="primary"
        >
          Add product
        </Button>
      </Grid>

      <ProductsTable
        products={adminState?.products}
        handleEditProductFormOpen={handleEditProductFormOpen}
        handleConfirmDeleteOpen={handleConfirmDeleteOpen}
      />
      {/* TODO: make it more generic */}
      <Dialog open={addFormVisible} onClose={handleAddProductFormClose}>
        <DialogTitle>Add product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the form to add the product.
          </DialogContentText>
          <ProductForm
            actionTrigger={addProductTrigger}
            submitText="Add Product"
          />
        </DialogContent>
      </Dialog>
      <Dialog open={editFormVisible} onClose={handleEditProductFormClose}>
        <DialogTitle>Edit product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the form to edit the product.
          </DialogContentText>
          <ProductForm
            actionTrigger={editProductTrigger}
            productID={selectedProductID}
            submitText="Edit Product"
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={confirmDeleteVisible}
        onClose={handleConfirmDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Are you sure you want to remove the product?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm product deletion.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmDeleteClose}
            color="primary"
            variant="contained"
            autoFocus
          >
            I want to keep the product
          </Button>
          <Button
            onClick={deleteProductListener}
            color="secondary"
            variant="contained"
          >
            Yes, remove the product
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default withRouter(Admin);
