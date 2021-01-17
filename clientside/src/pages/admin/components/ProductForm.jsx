import { Button } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { useAdminStyles } from "../styles";
import propTypes from "prop-types";

export const ProductForm = ({
  actionTrigger,
  productID,
  submitText = "submit",
}) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // ensure we submit number for price
    data.price = parseFloat(data.price);

    // for PUT and DELETE we need productID
    if (productID) {
      data.productID = productID;
    }
    // to start action defined in relevant hook, probably API call + some Flux
    actionTrigger(data);
  };
  const classes = useAdminStyles();
  return (
    <section className={classes.productForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {productID && (
          <input type="hidden" value={productID} name="productID" />
        )}
        <div className={classes.formRow}>
          <TextField
            name="name"
            placeholder="Product name"
            inputRef={register}
            className={classes.formInput}
          />
        </div>
        <div className={classes.formRow}>
          <TextField
            name="description"
            placeholder="Product description"
            inputRef={register}
            className={classes.formInput}
          />
        </div>
        <div className={classes.formRow}>
          <TextField
            name="price"
            placeholder="Product price"
            type="number"
            inputRef={register}
            className={classes.formInput}
          />
        </div>
        <div className={classes.formRow}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.formButton}
          >
            {submitText}
          </Button>
        </div>
      </form>
    </section>
  );
};

ProductForm.propTypes = {
  actionTrigger: propTypes.func,
  productID: propTypes.number,
  submitText: propTypes.string,
};
