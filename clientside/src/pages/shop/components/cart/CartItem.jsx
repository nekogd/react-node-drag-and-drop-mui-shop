import { TableRow, TableCell, IconButton } from "@material-ui/core";
import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import propTypes from "prop-types";

export const CartItem = ({ product, removeFromCart }) => {
  const { name, description, price, uuid } = product;

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>
        <IconButton onClick={removeFromCart(uuid, price)}>
          <DeleteOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

CartItem.propTypes = {
  product: propTypes.shape({
    name: propTypes.string,
    description: propTypes.string,
    price: propTypes.number,
    uuid: propTypes.string,
  }),
  removeFromCart: propTypes.func,
};
