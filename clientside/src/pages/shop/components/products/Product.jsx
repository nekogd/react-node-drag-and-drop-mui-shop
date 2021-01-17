import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "static/ItemTypes";
import { useProductStyles } from "./styles";
import propTypes from "prop-types";

export const Product = ({ product }) => {
  const { name, description, price } = product;
  const [, drag] = useDrag({
    item: { type: ITEM_TYPES.PRODUCT, name, description, price },
  });

  const classes = useProductStyles();

  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={3}
      ref={drag}
      className={classes.productHolder}
    >
      <Card className={classes.productCard}>
        <CardContent className={classes.productContent}>
          <Typography className={classes.productTitle}>
            <strong>{name}</strong>
          </Typography>
          <Typography>{description}</Typography>
          <Typography className={classes.price}>
            <strong>{price}</strong>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

Product.propTypes = {
  product: propTypes.shape({
    name: propTypes.string,
    description: propTypes.string,
    price: propTypes.number,
  }),
};
