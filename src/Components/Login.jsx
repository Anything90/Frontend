import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  // Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import backgroundLogo from "./Images/4.jpg";
import axios from "axios";
import logo from "./Images/logo (2).png";

function LogIn() {
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = useState("");

  const validateForm = () => {
    const newErrors = { ...errors };

    if (!logIn.username.trim()) {
      newErrors.username = "username is required";
    } else {
      newErrors.username = "";
    }

    if (!logIn.password.trim()) {
      newErrors.password = "Password is required";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    // fetch("/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: logIn.username,
    //     password: logIn.password,
    //   }),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setLoginMessage("Login successful.");
    //     setLogIn({ username: "", password: "" });
    //     setErrors({ username: "", password: "" });
    //     console.log(data);
    //     setTimeout(() => {
    //       if (data.role === "ADMIN") {
    //         navigate("/Admin/allBookings");
    //       } else if (data.role === "SUPERVISOR") {
    //         navigate("/Supervisor/startMatch");
    //       } else {
    //         navigate("/User/home");
    //       }
    //     }, 200);
    //   })
    //   .catch((error) => {
    //     setLoginMessage("Login failed. Please check your credentials.");
    //     console.error("There was a problem with the fetch operation:", error);
    //   });
    // await axios
    //   .post(`/login?username=${logIn.username}&password=${logIn.password}`)
    //   .then((response) => {
    //     setLoginMessage("Login successful.");
    //     setLogIn({ username: "", password: "" });
    //     setErrors({ username: "", password: "" });
    //     console.log(response.data);
    //     setTimeout(() => {
    //       response.data.role === "ADMIN"
    //         ? navigate("/Admin/allBookings")
    //         : response.data.role === "SUPERVISOR"
    //         ? navigate("/Supervisor/startMatch")
    //         : navigate("/User/home");
    //     }, 2000);
    //   })
    //   .catch((error) => {
    //     setLoginMessage("Login failed. Please check your credentials.");
    //     console.error(error);
    //   });
    try {
      const response = await axios.post(
        `/login?username=${logIn.username}&password=${logIn.password}`
      );

      setLoginMessage("Login successful.");
      setLogIn({ username: "", password: "" });
      setErrors({ username: "", password: "" });

      console.log(response.data);

      setTimeout(() => {
        const role = response.data.role;
        if (role === "ADMIN") {
          navigate("/Admin/allBookings");
        } else if (role === "SUPERVISOR") {
          navigate("/Supervisor/startMatch");
        } else {
          navigate("/User/home");
        }
      }, 200);
    } catch (error) {
      setLoginMessage("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setLogIn({ ...logIn, [e.target.name]: e.target.value });
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundLogo})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "60%",
    float: "left",
  };

  const InnerDiv = {
    width: "40%",
    float: "right",
  };

  return (
    <div>
      <div style={backgroundStyle}></div>
      <div style={InnerDiv}>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CssBaseline />
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
                mb: 2,
                color: "#4B125E",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Sign In
            </Typography>
            {loginMessage && (
              <span
                style={{
                  color: loginMessage.startsWith("Login successful")
                    ? "green"
                    : "red",
                  padding: 2,
                }}
              >
                {loginMessage}
              </span>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email Address"
                name="username"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                value={logIn.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                value={logIn.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs style={{ cursor: "pointer" }}>
                  <Link
                    onClick={() => {
                      navigate("/ForgetPassword");
                    }}
                    sx={{
                      textDecoration: "none",
                      color: "#4B125E",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item style={{ cursor: "pointer" }}>
                  <Link
                    onClick={() => {
                      navigate("/Signin");
                    }}
                    sx={{
                      textDecoration: "none",
                      color: "#4B125E",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    Don't have an account? Sign Up
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

export default LogIn;
