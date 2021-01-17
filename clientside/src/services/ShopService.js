import { axiosInstance } from "./axiosInstance";

export default class ShopService {
  static getProducts = async (queryString = "") =>
    await axiosInstance.get(`products?${queryString}`);

  static makeOrder = async (userId, products) =>
    await axiosInstance.post(`orders`, { userId, products });
}
