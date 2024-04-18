import {
  Box,
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import MailLockIcon from "@mui/icons-material/MailLock";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundLogo from "./Images/3.jpg";

function ForgetPassword({ onForget }) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const [tokenSent, setTokenSent] = useState(false);
  const [isTokenExpired, setTokenExpired] = useState(false);
  const [countdown, setCountdown] = useState(180);

  const handleTokenRequest = () => {
    axios
      .post(`/api/password-reset/send-email?userEmail=${userEmail}`)
      .then((response) => {
        if (response.status) {
          console.log(response.status);
          setTokenSent(true);
          setTokenExpired(false);
          setCountdown(180);
        }
      })
      .catch((error) => {
        console.error("API Request Error:", error);
      });
  };

  const handleVerifyToken = () => {
    axios
      .post(
        `/api/password-reset/verify-email?userEmail=${userEmail}&token=${token}`
      )
      .then((response) => {
        if (response.status) {
          console.log("token is valid.");
          onForget(userEmail);
          setTimeout(() => {
            navigate("/ResetPassword");
          }, 2000);
        } else {
          console.error("Invalid token:", response.error);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("Status Code:", error.response.status);
        } else {
          console.error("Network Error:", error.message);
        }
      });
  };

  useEffect(() => {
    let timer;
    if (tokenSent && !isTokenExpired) {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else {
        setTokenExpired(true);
      }
    }
    return () => clearTimeout(timer);
  }, [countdown, tokenSent, isTokenExpired]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundLogo})`,
    height: "98vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={backgroundStyle}>
      <Container component="main">
        <Box
          sx={{
            margin: 0,
            paddingTop: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={6}
            square={false}
            sx={{
              height: 400,
              width: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <MailLockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forget Password
            </Typography>
            <Box
              component="form"
              sx={{
                mt: 4,
                width: 300,
              }}
            >
              <TextField
                label="userEmail"
                type="email"
                variant="outlined"
                required
                fullWidth
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <Grid sx={{ mt: 4 }}>
                {tokenSent ? (
                  <div>
                    <TextField
                      label="Enter token"
                      type="text"
                      variant="outlined"
                      fullWidth
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleVerifyToken}
                      sx={{
                        mt: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        ml: 11,
                      }}
                    >
                      Verify token
                    </Button>
                    {isTokenExpired && (
                      <span style={{ color: "red" }}>Token has expired.</span>
                    )}
                    <span>Time left to enter token: {countdown} seconds</span>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTokenRequest}
                    sx={{
                      mt: 3,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      ml: 10,
                    }}
                  >
                    Request token
                  </Button>
                )}
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
      <button
        onClick={() => {
          navigate("/ResetPassword");
        }}
      >
        go back
      </button>
    </div>
  );
}

export default ForgetPassword;
