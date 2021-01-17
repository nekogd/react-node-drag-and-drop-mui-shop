import React from "react";
import { ProductSearch } from "pages/shop/components";
import { MOCKED_USER } from "static/mockedUser";
import { Button, Grid } from "@material-ui/core";
import { useShopHeaderStyles } from "./styles";
import propTypes from "prop-types";

export const ShopHeader = ({
  handleSearch,
  cart,
  handleCartOpen,
  makeOrderTrigger,
}) => {
  const classes = useShopHeaderStyles();
  return (
    <>
      <Grid container className={classes.shopTopBarHolder}>
        <Grid item xs={6}>
          <ProductSearch handleSearch={handleSearch} />
        </Grid>
        <Grid item xs={6} className={classes.headerButtonsHolder}>
          {/* To show only if we have items in cart */}
          {cart && cart.length > 0 && (
            <>
              <Button
                color="primary"
                variant="contained"
                onClick={handleCartOpen}
              >
                Open cart
              </Button>

              <Button
                onClick={makeOrderTrigger(MOCKED_USER.ID, cart)}
                color="primary"
                variant="contained"
                className={classes.makeOrderButton}
              >
                make order
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

ShopHeader.propTypes = {
  handleSearch: propTypes.func,
  cart: propTypes.array,
  handleCartOpen: propTypes.func,
  makeOrderTrigger: propTypes.func,
};
