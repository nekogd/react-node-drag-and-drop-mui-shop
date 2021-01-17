import React, { useState } from "react";
import { Shop } from "pages/shop/Shop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppHeader } from "components/appHeader/AppHeader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "pages/ProtectedRoute";
import Admin from "pages/admin/Admin";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "styles";
import { Grid } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ROUTES } from "static/routes";

function App() {
  // of course this comes somehow from backend on production
  // idea is to demonstate protected route
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginChange = (event) => {
    setIsAuthenticated(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container className="App">
        <Router>
          <AppHeader
            isAuthenticated={isAuthenticated}
            handleLoginChange={handleLoginChange}
          />
          <Switch>
            <Route path={ROUTES.ROOT} exact>
              <DndProvider backend={HTML5Backend}>
                <Shop />
              </DndProvider>
            </Route>
            {/* To make admin page only for admin */}
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              path={ROUTES.ADMIN}
              component={Admin}
            />
            <Route path="*">
              <div>404 Not found </div>
            </Route>
          </Switch>
        </Router>
      </Grid>
      {/* to mount react-toastify container for notifications and provide initial config*/}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
      />
    </ThemeProvider>
  );
}

export default App;
