import ErrorHandler from "services/ErrorHandler";
import ShopService from "services/ShopService";
import { useDrop } from "react-dnd";
import { ITEM_TYPES } from "static/ItemTypes";
import uuid from "react-uuid";
import { useImmerReducer } from "use-immer";
import { SHOP_ACTIONS } from "./constants";
import { toast } from "react-toastify";

// should be separate files once it grows, but it's small right now and easier to read that way
const initialImmerState = {
  isProductsLoading: true,
  isMakingOrder: false,
  hasMadeOrder: false,
  products: [],
  cart: [],
  cartTotal: 0,
};

function immerStoreReducer(draft, action) {
  switch (action.type) {
    // to show loading state
    case SHOP_ACTIONS.SET_IS_PRODUCTS_LOADING:
      return void (draft.isProductsLoading = action.payload);

    // to show working state
    case SHOP_ACTIONS.SET_IS_MAKING_ORDER:
      return void (draft.isMakingOrder = action.payload);

    // to show if user made order and show customised message
    case SHOP_ACTIONS.SET_HAS_MADE_ORDER:
      return void (draft.hasMadeOrder = action.payload);

    // to set products list
    case SHOP_ACTIONS.SET_PRODUCTS:
      return void (draft.products = action.payload);

    // to add item to cart
    case SHOP_ACTIONS.ADD_TO_CART:
      return void (draft.cart = [...draft.cart, action.payload]);

    // to remove the item from cart
    case SHOP_ACTIONS.REMOVE_FROM_CART:
      const filteredCart = draft.cart.filter(
        (product) => product.uuid !== action.payload
      );
      return void (draft.cart = filteredCart);

    // to reset cart
    case SHOP_ACTIONS.RESET_CART:
      return void (draft.cart = []);

    // to increase cart total
    case SHOP_ACTIONS.INCREASE_CART_TOTAL:
      const increasedCartTotal = draft.cartTotal + action.payload;
      return void (draft.cartTotal = increasedCartTotal);

    // to decrease cart total
    case SHOP_ACTIONS.DECREASE_CART_TOTAL:
      const decreasedCartTotal = parseFloat(draft.cartTotal - action.payload);
      return void (draft.cartTotal = decreasedCartTotal);

    // to reset cart total
    case SHOP_ACTIONS.RESET_CART_TOTAL:
      return void (draft.cartTotal = 0);

    default:
      return initialImmerState;
  }
}

export const useShop = () => {
  const [shopState, dispatch] = useImmerReducer(
    immerStoreReducer,
    initialImmerState
  );

  const getProductsRequest = async (queryString = "") => {
    dispatch({ type: SHOP_ACTIONS.SET_IS_PRODUCTS_LOADING, payload: true });
    try {
      const response = await ShopService.getProducts(queryString);
      dispatch({ type: SHOP_ACTIONS.SET_PRODUCTS, payload: response.data });
    } catch (e) {
      ErrorHandler.handleApiError(e);
    } finally {
      dispatch({ type: SHOP_ACTIONS.SET_IS_PRODUCTS_LOADING, payload: false });
    }
  };

  const makeOrderRequest = async (userID, cart) => {
    dispatch({ type: SHOP_ACTIONS.SET_IS_MAKING_ORDER, payload: true });
    try {
      // to place order
      await ShopService.makeOrder(userID, cart);
      // to reset cart
      dispatch({ type: SHOP_ACTIONS.RESET_CART, payload: false });
      dispatch({ type: SHOP_ACTIONS.RESET_CART_TOTAL, payload: false });
      dispatch({ type: SHOP_ACTIONS.SET_HAS_MADE_ORDER, payload: true });
      // to show notification
      toast.success(`Order created, please inspect db.json!`);
    } catch (e) {
      ErrorHandler.handleApiError(e);
    } finally {
      dispatch({ type: SHOP_ACTIONS.SET_IS_MAKING_ORDER, payload: false });
    }
  };

  const removeFromCart = (uuid, price) => (e) => {
    dispatch({ type: SHOP_ACTIONS.REMOVE_FROM_CART, payload: uuid });
    dispatch({
      type: SHOP_ACTIONS.DECREASE_CART_TOTAL,
      payload: price,
    });
    toast.success(`Product removed from the cart!`);
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: ITEM_TYPES.PRODUCT,
    drop(item) {
      // for internal React usage as a cart element
      // in next iteration, the cart items should be grouped by ID and the quantity should increase
      // e.g. desired: Hammer x 2 and recalculate subtotal
      item.uuid = uuid();
      dispatch({ type: SHOP_ACTIONS.ADD_TO_CART, payload: item });
      dispatch({
        type: SHOP_ACTIONS.INCREASE_CART_TOTAL,
        payload: item?.price,
      });
      toast.success(`${item?.name} added to the cart!`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  // to make it fully operational we would need user data,
  // which means authorisation, session or a simple form but for this I don't have needed time
  // Just assigning orders to some user id 8

  return {
    makeOrderRequest,
    isOver,
    dropRef,
    shopState,
    getProductsRequest,
    removeFromCart,
  };
};
