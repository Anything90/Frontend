import React, { useState } from "react";
import { IconButton, Box, Grid } from "@mui/material";
import a from "./Images/a.png";
import b from "./Images/b.png";
import c from "./Images/c.png";
import d from "./Images/d.png";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const images = [a, b, c, d];

function ImageCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  const previousImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const imageSize = {
    width: "1000px", 
    height: "500px", 
  };

  const abc = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
  };

  return (
    <div style={abc}>
      <Grid elevation={3} style={imageSize}>
        <Grid>
          <img
            src={images[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            style={imageSize}
          />
        </Grid>

        <Box display="flex" justifyContent="center">
          <IconButton onClick={previousImage} style={{ marginLeft: "5px" }}>
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={nextImage} style={{ marginRight: "5px" }}>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Grid>
    </div>
  );
}

export default ImageCarousel;
