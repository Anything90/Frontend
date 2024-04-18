import React, { useState, useEffect } from "react";
import { Paper, BottomNavigation, Typography, Box } from "@mui/material";
import logo from "./Images/logo (2).png";

const Footer = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {!isScrolling && (
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          elevation={3}
        >
          <BottomNavigation
            sx={{
              background: "#6A1F8E",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={0.5}
              sx={{ cursor: "pointer" }}
            >
              <div
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  mixBlendMode: "multiply",
                }}
              >
                <img src={logo} alt="logo" width="60px" height="80px" />
              </div>
              <Typography sx={{ color: "white" }}>
                &copy; KenShuttle Club 2024
              </Typography>
            </Box>
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};

export default Footer;
