import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { COLORS } from "styles/constants";
import { useCartStyles } from "./styles";
import propTypes from "prop-types";

function getStyle(backgroundColor) {
  return {
    backgroundColor,
  };
}
export const Cart = ({ isOver, dropRef, hasMadeOrder, cart, cartTotal }) => {
  let backgroundColor = COLORS.GREYLIGHT;
  if (isOver) {
    backgroundColor = COLORS.YELLOW;
  }
  const classes = useCartStyles();
  /**
   * drag and drop component
   */
  return (
    <Grid
      item
      xs={12}
      ref={dropRef}
      style={getStyle(backgroundColor)}
      className={classes.dragDropCart}
    >
      {/* To show customised message depending if order was successful */}
      {hasMadeOrder ? (
        <>
          <Typography>Thank you for placing the order. </Typography>
          <Typography>Would you like to make another one? </Typography>
          <Typography>Just drop your items below</Typography>
        </>
      ) : (
        <>
          <Typography>Drop your items here to add them to cart</Typography>
          {cart && cart.length > 0 && (
            <Typography>
              You have {cart?.length} items in your cart for a total of
              <strong> {cartTotal}</strong>
            </Typography>
          )}
        </>
      )}
    </Grid>
  );
};

Cart.propTypes = {
  isOver: propTypes.bool,
  dropRef: propTypes.oneOfType([
    // ref is a bit tricky
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]),
  hasMadeOrder: propTypes.bool,
  cart: propTypes.array,
  cartTotal: propTypes.number,
};
