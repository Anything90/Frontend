import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

function Invoice() {
  const location = useLocation();
  const response = location.state && location.state.responseData;

  const downloadInvoice = () => {
    if (!response) {
      return;
    }
    const invoiceContent = `
      ----------------------------------------
                  Invoice Details
      ----------------------------------------
      
      Transaction ID: ${response.paymentId.id}
      Payment Amount: ${response.amount}
      Pay Method: ${response.paymentId.method}
      Contact: ${response.paymentId.contact}
      
      ----------------------------------------
                  Booking Details
      ----------------------------------------
      
      Booking ID: ${response.bookingId}
      Booking Status: ${response.bookingStatus}
      Club Name: ${response.clubName}
      Court: ${response.courtId}
      Date: ${response.matchDate}
      Time: ${response.startTime} - ${response.endTime}
      Match Token: ${response.matchToken}
      Match Type: ${response.matchType}
      Name: ${response.playerEmail.firstName}
      Email: ${response.playerEmail.playerEmail}
      
      ----------------------------------------
          Thank you for your reservation!
      ----------------------------------------
    `;

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "invoice.txt");
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        sx={{ height: "100vh" }}
        spacing={2}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#4B125E",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Invoice
        </Typography>

        {response ? (
          <Grid container item justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "#4B125E",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Transaction Details
                </Typography>
                <Typography variant="body1">
                  <strong>Transaction ID:</strong> {response.paymentId.id}
                </Typography>
                <Typography variant="body1">
                  <strong>Payment Amount:</strong> {response.amount}
                </Typography>
                <Typography variant="body1">
                  <strong>Pay Method:</strong> {response.paymentId.method}
                </Typography>
                <Typography variant="body1">
                  <strong>Contact:</strong> {response.paymentId.contact}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "#4B125E",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Booking Details
                </Typography>
                <Typography variant="body1">
                  <strong>Booking ID:</strong> {response.bookingId}
                </Typography>
                <Typography variant="body1">
                  <strong>Booking Status:</strong> {response.bookingStatus}
                </Typography>
                <Typography variant="body1">
                  <strong>Club Name:</strong> {response.clubName}
                </Typography>
                <Typography variant="body1">
                  <strong>Court:</strong> {response.courtId}
                </Typography>
                <Typography variant="body1">
                  <strong>Date:</strong> {response.matchDate}
                </Typography>
                <Typography variant="body1">
                  <strong>Time:</strong> {response.startTime}-{response.endTime}
                </Typography>
                <Typography variant="body1">
                  <strong>Match Token:</strong> {response.matchToken}
                </Typography>
                <Typography variant="body1">
                  <strong>Match Type:</strong> {response.matchType}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {response.playerEmail.firstName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {response.playerEmail.playerEmail}
                </Typography>
              </Paper>
            </Grid>
            <Button
              sx={{
                mt: 4,
                backgroundColor: "#FF7518",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#F28500",
                  color: "black",
                },
              }}
              variant="contained"
              onClick={downloadInvoice}
            >
              DownLoad Invoice
            </Button>
          </Grid>
        ) : (
          <>
            <Typography variant="body1">No invoice data available.</Typography>
            <Button
              component={Link}
              to="/User/book"
              variant="contained"
              sx={{
                backgroundColor: "#FF7518",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#F28500",
                  color: "black",
                },
              }}
            >
              Go Back
            </Button>
          </>
        )}
      </Grid>
    </div>
  );
}

export default Invoice;
