import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import NoMatch from "./NoMatch";
import MyProfile from "./MyProfile";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Footer from "./Footer";
import logo from "./Images/logo (2).png";
import {
  AppBar,
  Toolbar,
  // Typography,
  Button,
  Menu,
  MenuItem,
  Hidden,
  Box,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import AllBookings from "./AllBookings";
import AllMatches from "./AllMatches";
import GetCourts from "./GetCourts";
import Analytics from "./Analytics";
import Player from "./Player";
import Employees from "./Employees";

function Admin() {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const userSignOut = useCallback(() => {
    localStorage.clear();
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      userSignOut();
    }, 60 * 60 * 1000);
    const unsubscribe = () => {};

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [userSignOut]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            background: "#6A1F8E",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Box flexGrow={1} display="flex" alignItems="center" gap={0.5}>
              {/* <Typography variant="h5" sx={{ width: "fit-content" }}>
                KENSHUTTLE
              </Typography> */}
              <div
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  mixBlendMode: "multiply",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/Admin/allBookings");
                }}
              >
                <img src={logo} alt="logo" width="60px" height="80px" />
              </div>
            </Box>
            <Hidden>
              <Box display="flex" alignItems="center" gap={1.0}>
                <NavLink to="allBookings">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    aria-hidden="true"
                  >
                    Bookings
                  </Button>
                </NavLink>
                <NavLink to="allMatches">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    aria-hidden="true"
                  >
                    Matches
                  </Button>
                </NavLink>
                <NavLink to="clubManagement">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    aria-hidden="true"
                  >
                    Club Management
                  </Button>
                </NavLink>
                <NavLink to="players">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    aria-hidden="true"
                  >
                    Players
                  </Button>
                </NavLink>
                <NavLink to="employees">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    aria-hidden="true"
                  >
                    Employees
                  </Button>
                </NavLink>
                <NavLink to="analytics">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    aria-hidden="true"
                  >
                    Analytics
                  </Button>
                </NavLink>

                <Button
                  color="inherit"
                  id="products-button"
                  onClick={handleClick}
                  aria-controls={open ? "products-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  endIcon={<ArrowDropDownIcon />}
                >
                  Profile
                </Button>
                <Menu
                  id="products-menu"
                  anchorEl={anchor}
                  open={open}
                  MenuListProps={{
                    "aria-labelledby": "products-button",
                  }}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <NavLink to="myProfile" style={{ textDecoration: "none" }}>
                    <MenuItem
                      onClick={handleClose}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#8134AF",
                          "& button": {
                            color: "white",
                          },
                        },
                      }}
                    >
                      <Button sx={{ color: "black" }}>
                        <AccountCircleIcon sx={{ mr: 1 }} />
                        My Profile
                      </Button>
                    </MenuItem>
                  </NavLink>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#8134AF",
                        "& button": {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <Button sx={{ color: "black" }} onClick={userSignOut}>
                      <PowerSettingsNewIcon sx={{ mr: 1 }} />
                      LogOut
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </Hidden>
          </Toolbar>
        </AppBar>
      </Box>
      <Footer />
      <Routes>
        <Route path="/allBookings" element={<AllBookings />} />
        <Route path="/allMatches" element={<AllMatches />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/clubManagement" element={<GetCourts />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/players" element={<Player />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default Admin;
