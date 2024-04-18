import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import backgroundLogo from "./Images/home.jpg";
import { useState } from "react";
import axios from "axios";
import logo from "./Images/logo (2).png";

function SignIn() {
  const textStyle = {
    cursor: "pointer",
  };

  const error = {
    color: "red",
  };

  const success = {
    color: "green",
  };

  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    playerEmail: "",
    password: "",
    dominantHand: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    for (const field in data) {
      if (!data[field].trim()) {
        newErrors[field] = "This field is required";
      } else {
        newErrors[field] = "";
      }
    }

    if (!/\S+@\S+\.\S+/.test(data.playerEmail)) {
      newErrors.playerEmail = "Invalid playerEmail address";
    }

    if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(data.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one special character";
    }
    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    await axios
      .post("/api/players/register", data)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Sign up successful. You can now sign in.");
        setData("");
        setErrors("");
        setFormError("");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        setFormError(error.message);
      });
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundLogo})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "60%",
    float: "right",
  };

  const signinFormStyle = {
    width: "40%",
    float: "left",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div>
      <div style={backgroundStyle}></div>
      <div style={signinFormStyle}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              margin: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                mixBlendMode: "multiply",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/User/home");
              }}
            >
              <img src={logo} alt="logo" height="250px" />
            </div>
            <Typography
              component="h1"
              variant="h3"
              sx={{
                mb: 3,
                color: "#4B125E",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Sign Up
            </Typography>
            {formError && (
              <span style={{ ...error, padding: 2 }}>{formError}</span>
            )}
            {successMessage && (
              <span style={{ ...success, padding: 2 }}>{successMessage}</span>
            )}
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={data.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <span style={error}>{errors.firstName}</span>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={data.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <span style={error}>{errors.lastName}</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="playerEmail"
                    label="Email Address"
                    name="playerEmail"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={data.playerEmail}
                    onChange={handleChange}
                  />
                  {errors.playerEmail && (
                    <span style={error}>{errors.playerEmail}</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={data.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <span style={error}>{errors.password}</span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="dominantHand-label" sx={{ color: "black" }}>
                    Dominating Hand
                  </InputLabel>
                  <Select
                    labelId="dominantHand-label"
                    id="dominantHand"
                    label="Dominating Hand"
                    required
                    fullWidth
                    name="dominantHand"
                    value={data.dominantHand}
                    onChange={handleChange}
                  >
                    <MenuItem value="rightHanded" name="dominantHand">
                      Right Handed
                    </MenuItem>
                    <MenuItem value="leftHanded" name="dominantHand">
                      Left Handed
                    </MenuItem>
                  </Select>
                  {errors.dominantHand && (
                    <span style={error}>{errors.dominantHand}</span>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#FF7518",
                  color: "#FFF",
                  "&:hover": {
                    backgroundColor: "#F28500",
                    color: "black",
                  },
                }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item style={textStyle}>
                  <Link
                    onClick={() => {
                      navigate("/");
                    }}
                    sx={{
                      textDecoration: "none",
                      color: "#4B125E",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default SignIn;
