import { axiosInstance } from "./axiosInstance";

export default class AdminService {
  static addProductRequest = async (data) => {
    return await axiosInstance.post(`products`, data);
  };
  static editProductRequest = async (data) => {
    const { productID } = data;
    return await axiosInstance.put(`products/${productID}`, data);
  };
  static deleteProductRequest = async (productID) => {
    return await axiosInstance.delete(`products/${productID}`);
  };
}
