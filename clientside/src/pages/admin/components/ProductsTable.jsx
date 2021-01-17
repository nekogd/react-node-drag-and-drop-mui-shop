import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";
import React from "react";
import propTypes from "prop-types";

export const ProductsTable = ({
  products,
  handleEditProductFormOpen,
  handleConfirmDeleteOpen,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Product Name</TableCell>
          <TableCell>Product Description</TableCell>
          <TableCell>Product Price</TableCell>
          <TableCell>Edit</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products &&
          products.map((product) => {
            return (
              <TableRow key={product?.id}>
                <TableCell>{product?.name}</TableCell>
                <TableCell> {product?.description}</TableCell>
                <TableCell> {product?.price}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditProductFormOpen(product?.id)}
                  >
                    Edit Product
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleConfirmDeleteOpen(product?.id)}
                  >
                    Delete Product
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

ProductsTable.propTypes = {
  products: propTypes.array,
  handleEditProductFormOpen: propTypes.func,
  handleConfirmDeleteOpen: propTypes.func,
};
