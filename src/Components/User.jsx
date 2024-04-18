import React, { useCallback, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Footer from "./Footer";
import { AppBar, Toolbar, Button, Menu, MenuItem, Hidden } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import NoMatch from "./NoMatch";
import Home from "./Home";
import WalletIcon from "@mui/icons-material/Wallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import logo from "./Images/logo (2).png";
import Book from "./Book";
import SubBook from "./SubBook";
import Details from "./Details";
import Wallet from "./Wallet";
import Invoice from "./Invoice";
import Cart from "./Cart";
import Payment from "./Payment";
import ScoreBoard from "./ScoreBoard";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import Playerbookings from "./Playerbookings";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import InfoIcon from "@mui/icons-material/Info";
import UserMatches from "./UserMatches";

function User() {
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
              <div
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  mixBlendMode: "multiply",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/User/home");
                }}
              >
                <img src={logo} alt="logo" width="60px" height="80px" />
              </div>
            </Box>
            <Hidden>
              <Box display="flex" alignItems="center" gap={0.1}>
                <NavLink to="home">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    aria-hidden="true"
                  >
                    Home
                  </Button>
                </NavLink>
                <NavLink to="book">
                  <Button sx={{ color: "white", textDecoration: "none" }}>
                    Book
                  </Button>
                </NavLink>
                <NavLink to="cart">
                  <Button sx={{ color: "white", textDecoration: "none" }}>
                    <ShoppingCartIcon />
                    Cart
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
                  <NavLink to="userProfile" style={{ textDecoration: "none" }}>
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
                      <Button
                        sx={{
                          color: "black",
                        }}
                      >
                        <AccountCircleIcon sx={{ mr: 1 }} />
                        My Profile
                      </Button>
                    </MenuItem>
                  </NavLink>
                  <NavLink to="wallet" style={{ textDecoration: "none" }}>
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
                        <WalletIcon sx={{ mr: 1 }} />
                        Wallet
                      </Button>
                    </MenuItem>
                  </NavLink>
                  <NavLink to="invoice" style={{ textDecoration: "none" }}>
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
                        <ReceiptIcon sx={{ mr: 1 }} />
                        Invoice
                      </Button>
                    </MenuItem>
                  </NavLink>
                  <NavLink
                    to="playerBookings"
                    style={{ textDecoration: "none" }}
                  >
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
                        <LibraryBooksIcon sx={{ mr: 1 }} />
                        Bookings
                      </Button>
                    </MenuItem>
                  </NavLink>
                  <NavLink to="userMatches" style={{ textDecoration: "none" }}>
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
                        <InfoIcon sx={{ mr: 1 }} />
                        Matches
                      </Button>
                    </MenuItem>
                  </NavLink>
                  <NavLink to="scoreBoard" style={{ textDecoration: "none" }}>
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
                        <ScoreboardIcon sx={{ mr: 1 }} />
                        ScoreBoard
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
        <Route path="/home" element={<Home />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/payment" element={<Payment />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/book" element={<Book />} />
        <Route path="/book/:id" element={<SubBook />} />
        <Route path="/book/:id/:title" element={<Details />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/scoreBoard" element={<ScoreBoard />} />
        <Route path="/playerBookings" element={<Playerbookings />} />
        <Route path="/userMatches" element={<UserMatches />} />
      </Routes>
    </>
  );
}

export default User;
