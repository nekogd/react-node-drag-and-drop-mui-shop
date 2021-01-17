import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import {
  Grid,
  Toolbar,
  List,
  ListItem,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

import { useAppHeaderStyles } from "./styles";
import { ROUTES } from "static/routes";
import propTypes from "prop-types";

export const AppHeader = ({ isAuthenticated, handleLoginChange }) => {
  const classes = useAppHeaderStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to={ROUTES.ROOT} className={classes.title}>
            Shop logo
          </Link>
          <List className={classes.listHeader}>
            {isAuthenticated && (
              <ListItem>
                <Link to={ROUTES.ADMIN} className={classes.link}>
                  Go to admin panel
                </Link>
              </ListItem>
            )}
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isAuthenticated}
                    onChange={handleLoginChange}
                    aria-label="login switch"
                  />
                }
                label={isAuthenticated ? "Logout" : "Login"}
              />
            </FormGroup>
          </List>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

AppHeader.propTypes = {
  isAuthenticated: propTypes.bool,
  handleLoginChange: propTypes.func,
};
