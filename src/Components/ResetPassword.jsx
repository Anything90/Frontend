import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordIcon from "@mui/icons-material/Password";

function ResetPassword({ email }) {
  const navigate = useNavigate();
  //   const [userEmail, setUserEmail] = useState(email);
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [resetStatus, setResetStatus] = useState("");

  const backgroundStyle = {
    background: "#ff817e",
    height: "98vh",
    width: "99vw",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userEmail = email;
    console.log(userEmail);
    if (newPassword !== reenterPassword) {
      setResetStatus("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `/api/password-reset/reset-password?userEmail=${userEmail}&newPassword=${newPassword}`
      );

      if (response.status) {
        setResetStatus("Password reset successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setResetStatus("Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password: ", error);
      setResetStatus("Password reset failed");
    }
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
              <PasswordIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            {resetStatus && (
              <Typography
                color={resetStatus.includes("successful") ? "green" : "red"}
              >
                {resetStatus}
              </Typography>
            )}
            <Box
              component="form"
              sx={{
                mt: 4,
                width: 300,
                textAlign: "center",
              }}
            >
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                label="Re-Enter Password"
                type="password"
                fullWidth
                value={reenterPassword}
                onChange={(e) => setReenterPassword(e.target.value)}
                sx={{ mb: 3 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        go back
      </button>
    </div>
  );
}

export default ResetPassword;
