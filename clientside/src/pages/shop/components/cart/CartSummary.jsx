import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import { CartItem } from "./CartItem";
import { useCartStyles } from "./styles";
import propTypes from "prop-types";

export const CartSummary = ({ cart, cartTotal, removeFromCart }) => {
  const classes = useCartStyles();
  return (
    <Grid item xs={12}>
      {cart && cart.length > 0 ? (
        <>
          <Table className={classes.cartSummaryTable}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Price</strong>
                </TableCell>
                <TableCell>
                  <strong>Remove</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((product) => (
                <CartItem
                  product={product}
                  key={product.uuid}
                  removeFromCart={removeFromCart}
                />
              ))}
              {cartTotal && (
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell colSpan={2}>
                    <strong>{cartTotal}</strong>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <Typography>Your cart is empty, please drop something in :)</Typography>
      )}
    </Grid>
  );
};

CartSummary.propTypes = {
  cart: propTypes.array,
  cartTotal: propTypes.number,
  removeFromCart: propTypes.func,
};
