import React, { /* useState */ useEffect, useCallback } from "react";
import { Routes, Route /* NavLink */ } from "react-router-dom";
import NoMatch from "./NoMatch";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import Footer from "./Footer";
import logo from "./Images/logo (2).png";
import { AppBar, Toolbar, Button, Hidden, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StartMatch from "./StartMatch";
import UpdateScore from "./UpdateScore";

function Admin() {
  const navigate = useNavigate();

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
              <div
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  mixBlendMode: "multiply",
                  cursor: "pointer",
                }}
              >
                <img src={logo} alt="logo" width="60px" height="75px" />
              </div>
            </Box>
            <Hidden>
              <Box display="flex" alignItems="center" gap={1.0}>
                <div>
                  <Button sx={{ color: "white" }} onClick={userSignOut}>
                    <PowerSettingsNewIcon sx={{ mr: 1 }} />
                    LogOut
                  </Button>
                </div>
              </Box>
            </Hidden>
          </Toolbar>
        </AppBar>
      </Box>
      <Footer />
      <Routes>
        <Route path="/startMatch" element={<StartMatch />} />
        <Route path="/updateScore" element={<UpdateScore />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default Admin;
