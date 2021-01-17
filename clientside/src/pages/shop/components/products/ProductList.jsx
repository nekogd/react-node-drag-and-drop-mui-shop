import React from "react";
import { Product } from "./Product";
import propTypes from "prop-types";

export const ProductList = ({ products }) => {
  if (products == null || products.length === 0) return "no products";

  return (
    <>
      {products?.map((product) => (
        <Product key={product?.id} product={product} />
      ))}
    </>
  );
};

ProductList.propTypes = {
  products: propTypes.array,
};
