import React from "react";
import ImageCarousel from "./ImageCarousel";
import { Box, Grid, Typography, Button } from "@mui/material";
import imageD from "./Images/d.png";
import arrow from "./Images/arrow.png";
import ScheduleTwoToneIcon from "@mui/icons-material/ScheduleTwoTone";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const customFontStyle = {
    fontFamily: "GlossAndBloom, cursive",
  };
  return (
    <div>
      <Box sx={{ mt: 14 }}>
        <Grid sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <img src={imageD} alt="For the home page" />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "centers",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#4B125E",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
            style={customFontStyle}
          >
            Badminton
          </Typography>
          <Typography variant="body1" sx={{ mt: 3 }}>
            badminton courts located at the Multi-Purpose Hall. Online booking
            available.
          </Typography>
          <Grid sx={{ mt: 2 }}>
            <img src={arrow} alt="arrow content" />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 4,
          }}
        >
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" sx={{ color: "#4B125E" }}>
              Operating Hours
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item>
                <ScheduleTwoToneIcon />
              </Grid>
              <Grid item>
                <Typography variant="h6">Daily : 6am - 9pm</Typography>
              </Grid>
            </Grid>
            <Typography variant="h4" sx={{ mt: 4, color: "#4B125E" }}>
              Enquiries
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item>
                <PhoneIcon />
              </Grid>
              <Grid item>
                <Typography variant="h6">1234567890</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <MailIcon />
              </Grid>
              <Grid item>
                <Typography variant="h6">deepdanu@kenshuttle.com</Typography>
              </Grid>
            </Grid>
            <Button
              // variant="outlined"
              sx={{
                mt: 3,
                backgroundColor: "#FF7518",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#F28500",
                  color: "black",
                },
              }}
              onClick={() => {
                navigate("/User/book");
              }}
            >
              Book Now
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ImageCarousel />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
