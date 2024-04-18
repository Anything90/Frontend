import { Grid, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useRazorpay from "react-razorpay";
import successImage from "./Images/successImage.jpg";
import errorImage from "./Images/errorImage.png";

function Payment() {
  const [Razorpay] = useRazorpay();
  const location = useLocation();
  const navigate = useNavigate();
  const paymentDetails = location.state && location.state.bookingDetails;
  const [userData, setUserData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [response, setResponse] = useState(null);

  const razorpayApiKey = "rzp_test_StXDIvRhdIIkZm";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/players/profile-details");
        setUserData(response.data);
        const orderResponse = await axios.post(
          "/api/payment/create-order",
          paymentDetails
        );
        console.log(orderResponse.data);
        const options = {
          key: razorpayApiKey,
          amount: paymentDetails.amount,
          currency: "INR",
          name: "KENSHUTTLE",
          description: "Badminton Club Management",
          order_id: orderResponse.data,
          handler: function (response) {
            console.log("Payment successful:", response);
            if (response.razorpay_payment_id) {
              axios
                .post(
                  `/api/payment/verify-payment?paymentId=${response.razorpay_payment_id}`
                )
                .then((response) => {
                  setResponse(response.data);
                })
                .catch((error) => {
                  console.error(error);
                });

              setPaymentStatus("success");
            } else {
              setPaymentStatus("failure");
            }
          },
          prefill: {
            name: userData.firstName,
            email: userData.playerEmail,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error(
          "Error fetching user data or creating payment order:",
          error
        );
      }
    };

    if (paymentDetails) {
      console.log(paymentDetails);
      fetchData();
    } else {
      console.log("No Details");
    }
  }, [Razorpay, paymentDetails, userData?.firstName, userData?.playerEmail]);

  const SuccessMessage = () => (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <img
        src={successImage}
        alt="Success"
        style={{ width: 100, height: 100 }}
      />
      <Typography variant="h5" sx={{ mt: 4 }}>
        Payment Successful!
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 4,
          backgroundColor: "#FF7518",
          color: "#FFF",
          "&:hover": {
            backgroundColor: "#F28500",
            color: "black",
          },
        }}
        onClick={() => {
          navigate("/User/invoice", { state: { responseData: response } });
        }}
      >
        Download Invoice
      </Button>
    </Grid>
  );

  const FailureMessage = () => (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <img src={errorImage} alt="Failure" style={{ width: 100, height: 100 }} />
      <Typography variant="h5" sx={{ mt: 4 }}>
        Payment Unsuccessful. Please try again.
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 4,
          backgroundColor: "#FF7518",
          color: "#FFF",
          "&:hover": {
            backgroundColor: "#F28500",
            color: "black",
          },
        }}
      >
        Retry Payment
      </Button>
    </Grid>
  );

  return (
    <div>
      <Grid>
        {paymentStatus === "success" ? (
          <SuccessMessage />
        ) : paymentStatus === "failure" ? (
          <FailureMessage />
        ) : (
          <Typography variant="h5">Processing payment...</Typography>
        )}
      </Grid>
    </div>
  );
}

export default Payment;
