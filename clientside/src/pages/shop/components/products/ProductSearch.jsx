import { TextField } from "@material-ui/core";
import React from "react";
import propTypes from "prop-types";

export const ProductSearch = ({ handleSearch }) => {
  return (
    <TextField
      onChange={handleSearch}
      placeholder="search"
      variant="outlined"
    />
  );
};

ProductSearch.propTypes = {
  handleSearch: propTypes.func,
};
