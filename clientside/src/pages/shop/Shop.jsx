import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "components";
import { Cart, CartSummary, ShopHeader, ProductList } from "./components";
import { useShop } from "./hooks/useShop";
import { Dialog, DialogContent, DialogTitle, Grid } from "@material-ui/core";
import { useShopStyles } from "./styles/index";
import debounce from "lodash.debounce";

export const Shop = () => {
  const {
    shopState,
    getProductsRequest,
    dropRef,
    isOver,
    removeFromCart,
    makeOrderRequest,
  } = useShop();

  /**
   * to search by title
   * name_like is what we send to json-server for search.
   * "name" is the key of object
   * using lodash.debounce for now
   * @docs https://www.npmjs.com/package/json-server#operators
   * for fun, change name_like to description_like and it will fetch by description
   */
  const handleSearch = debounce((e) => {
    getProductsRequest(`name_like=${e.target.value}`);
  }, 300);

  const makeOrderTrigger = (userId, cart) => (e) => {
    makeOrderRequest(userId, cart);
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };
  const handleCartClose = () => {
    setIsCartOpen(false);
  };
  /**
   * initial data fetch
   * Be careful if modyfying because I disabled dependency check due to incorrect warning
   */
  useEffect(() => {
    getProductsRequest();
    // eslint-disable-next-line
  }, []);

  const {
    products,
    isProductsLoading,
    isMakingOrder,
    cart,
    cartTotal,
    hasMadeOrder,
  } = shopState;
  const classes = useShopStyles();
  return (
    <Grid item xs={12} className={classes.shop}>
      <ShopHeader
        cart={cart}
        handleCartOpen={handleCartOpen}
        handleSearch={handleSearch}
        makeOrderTrigger={makeOrderTrigger}
      />
      <Grid container spacing={3} className={classes.productsHolder}>
        <Grid item md={6} xs={6}>
          <Grid container spacing={3} className={classes.productsListHolder}>
            <ProductList products={products} />
          </Grid>
        </Grid>
        <Grid item md={6} xs={6}>
          <Grid container className={classes.cartHolder}>
            <Cart
              dropRef={dropRef}
              isOver={isOver}
              cart={cart}
              cartTotal={cartTotal}
              removeFromCart={removeFromCart}
              hasMadeOrder={hasMadeOrder}
            />
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={isCartOpen} onClose={handleCartClose}>
        <DialogTitle>Your Cart</DialogTitle>
        <DialogContent>
          <CartSummary
            cart={cart}
            cartTotal={cartTotal}
            removeFromCart={removeFromCart}
          />
        </DialogContent>
      </Dialog>
      {/* TODO: to show loading spinners which are nice*/}
      {isProductsLoading && <LoadingSpinner />}
      {isMakingOrder && <LoadingSpinner />}
    </Grid>
  );
};
