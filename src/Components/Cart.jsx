import { Grid, Typography, Paper, Button } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Empty from "./Images/empty.png";
// import axios from "axios";

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state && location.state.bookingDetails;

  // const handleRemove = async () => {
  //   await axios
  //     .delete(
  //       `/api/booking/removeBookings?bookingId=${bookingDetails.bookingId}`
  //     )
  //     .then((response) => {
  //       console.log(response.status);
  //     })
  //     .catch((error) => {
  //       console.error("Error to remove", error);
  //     });
  // };

  return (
    <div>
      <Grid
        sx={{
          mt: 12,
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#4B125E",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Booking Cart
        </Typography>
        <Paper
          style={{
            padding: "30px 20px",
            width: 500,
            margin: "60px auto",
          }}
          elevation={4}
        >
          {bookingDetails ? (
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              spacing={2}
              xs={13}
            >
              <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Booking ID: {bookingDetails.bookingId}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Club Name: {bookingDetails.clubName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Court ID:{bookingDetails.courtId}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                <Typography variant="h6">
                  MatchDate: {bookingDetails.matchDate}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Match Type: {bookingDetails.matchType}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Amount: {bookingDetails.amount}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Start Time: {bookingDetails.startTime}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                <Typography variant="h6">
                  End Time: {bookingDetails.endTime}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/User/cart");
                  }}
                  sx={{
                    backgroundColor: "#FF7518",
                    color: "#FFF",
                    "&:hover": {
                      backgroundColor: "#F28500",
                      color: "black",
                    },
                  }}
                >
                  Remove from Cart
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/User/cart/payment", {
                      state: { bookingDetails },
                    });
                  }}
                  sx={{
                    backgroundColor: "#FF7518",
                    color: "#FFF",
                    "&:hover": {
                      backgroundColor: "#F28500",
                      color: "black",
                    },
                  }}
                >
                  Make Payment
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  color: "#4B125E",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Your cart is empty.
              </Typography>
              <img
                src={Empty}
                alt="Empty"
                height="50%"
                width="60%"
                sx={{ mt: 3 }}
              />
              <Button
                variant="contained"
                color="primary"
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
          )}
        </Paper>
      </Grid>
    </div>
  );
}

export default Cart;
