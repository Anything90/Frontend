import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 500,
  margin: "auto",
  minHeight: "60vh",
}));

const NoMatch = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <StyledPaper elevation={10}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            404! Page Not Found
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            The page you are looking for does not exist or has been removed.
          </Typography>
          {/* <img src={errorpage} alt="Dog Image" width="250px" height="250px" /> */}
        </Grid>
      </StyledPaper>
    </Grid>
  );
};

export default NoMatch;
