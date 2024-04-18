import React, { useState, useEffect } from "react";
import { TextField, Grid, Paper, InputLabel } from "@mui/material";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("/api/players/profile-details");
        setUserData(userResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      container
      justify="center"
      sx={{
        mt: 14,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      <Grid item xs={6}>
        <Paper
          style={{
            padding: "30px 20px",
            width: 500,
            margin: "60px auto",
          }}
          elevation={4}
        >
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel
                  htmlFor="empFirstName"
                  sx={{ textAlign: "left", color: "black" }}
                >
                  First Name:
                </InputLabel>
                <TextField
                  id="empFirstName"
                  name="empFirstName"
                  value={userData.firstName}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  htmlFor="empLastName"
                  sx={{ textAlign: "left", color: "black" }}
                >
                  Last Name:
                </InputLabel>
                <TextField
                  id="empLastName"
                  name="empLastName"
                  value={userData.lastName}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="empEmail"
                sx={{ textAlign: "left", color: "black" }}
              >
                Email:
              </InputLabel>
              <TextField
                id="empEmail"
                name="empEmail"
                value={userData.playerEmail}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ mt: 2 }}>
                <InputLabel
                  htmlFor="dominantHand"
                  sx={{ textAlign: "left", color: "black" }}
                >
                  DominantHand:
                </InputLabel>
                <TextField
                  id="dominantHand"
                  name="dominantHand"
                  value={userData.dominantHand}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={6} sx={{ mt: 2 }}>
                <InputLabel
                  htmlFor="active"
                  sx={{ textAlign: "left", color: "black" }}
                >
                  Active:
                </InputLabel>
                <TextField
                  id="active"
                  name="active"
                  value={userData.active}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
