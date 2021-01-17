import AdminService from "services/AdminService";
import ErrorHandler from "services/ErrorHandler";
import ShopService from "services/ShopService";
import { useImmerReducer } from "use-immer";
import { ADMIN_ACTIONS } from "./constants";
import { toast } from "react-toastify";

// should be separate files once it grows, but it's small right now and easier to read that way
const initialImmerState = {
  products: [],
  isProductsLoading: false,
};

function immerStoreReducer(draft, action) {
  switch (action.type) {
    case ADMIN_ACTIONS.SET_IS_PRODUCTS_LOADING:
      return void (draft.isProductsLoading = action.payload);
    // to set admin products list
    case ADMIN_ACTIONS.SET_PRODUCTS:
      return void (draft.products = action.payload);

    default:
      return initialImmerState;
  }
}

export const useAdmin = () => {
  const [adminState, dispatch] = useImmerReducer(
    immerStoreReducer,
    initialImmerState
  );

  // can be reused from useShop but I feel like it is better to separate them
  // later on we might have different permissions and product listing
  const getAdminProductsRequest = async (queryString = "") => {
    dispatch({ type: ADMIN_ACTIONS.SET_IS_PRODUCTS_LOADING, payload: true });
    try {
      const response = await ShopService.getProducts(queryString);
      dispatch({ type: ADMIN_ACTIONS.SET_PRODUCTS, payload: response.data });
    } catch (e) {
      ErrorHandler.handleApiError(e);
    } finally {
      dispatch({ type: ADMIN_ACTIONS.SET_IS_PRODUCTS_LOADING, payload: false });
    }
  };
  // to add product
  const addProductTrigger = async (data) => {
    try {
      const response = await AdminService.addProductRequest(data);
      if (response?.data?.id) {
        getAdminProductsRequest();
        toast.success("Product added, please check db.json");
      }
    } catch (e) {
      ErrorHandler.handleApiError(e);
    }
  };
  // to delete product
  const deleteProductTrigger = async (productID) => {
    try {
      await AdminService.deleteProductRequest(productID);
      toast.success("Product deleted, please check db.json");
      getAdminProductsRequest();
    } catch (e) {
      ErrorHandler.handleApiError(e);
    }
  };
  // to edit product - it is PUT
  const editProductTrigger = async (data) => {
    try {
      const response = await AdminService.editProductRequest(data);
      if (response?.data?.id) {
        getAdminProductsRequest();
        toast.success("Product edited, please check db.json");
      }
    } catch (e) {
      ErrorHandler.handleApiError(e);
    }
  };

  return {
    adminState,
    getAdminProductsRequest,
    addProductTrigger,
    editProductTrigger,
    deleteProductTrigger,
  };
};
