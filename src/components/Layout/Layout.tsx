import "./Layout.scss";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useMemo } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();

  const isOrdersPage = useMemo(
    () => location.pathname.startsWith("/orders"),
    [location.pathname]
  );

  return (
    <div>
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Transport.ly
              </Typography>
              {isOrdersPage && (
                <NavLink to="/" className="header-navlink">
                  <Button color="inherit">
                    View Flights Schedule
                  </Button>
                </NavLink>
              )}
              {!isOrdersPage && (
                <NavLink to="/orders" className="header-navlink">
                  <Button color="inherit">
                    View Orders
                  </Button>
                </NavLink>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
