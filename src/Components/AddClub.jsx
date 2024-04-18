// AddClub.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";

const AddClub = () => {
  const [clubData, setClubData] = useState({
    clubName: "",
    clubAddressLine1: "",
    clubAddressLine2: "",
    clubCity: "",
    clubArea: "",
    clubPincode: "",
    clubState: "",
    clubRegion: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClubData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddClub = async () => {
    try {
      const response = await axios.post(
        "/api/club-and-court/add-club",
        clubData
      );
      console.log("Club added successfully:", response.status);
      setClubData({
        clubName: "",
        clubAddressLine1: "",
        clubAddressLine2: "",
        clubCity: "",
        clubArea: "",
        clubPincode: "",
        clubState: "",
        clubRegion: "",
      });
      setMessage({ type: "success", text: "Club Added successfully" });
    } catch (error) {
      setMessage({ type: "error", text: "Error adding club" });
      console.error("Error adding club:", error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 5, mt: 15 }}>
        {message && (
          <Typography
            variant="body2"
            color={message.type === "success" ? "success" : "error"}
            style={{ marginBottom: "15px" }}
          >
            {message.text}
          </Typography>
        )}
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ padding: 2 }}
        >
          Add Club
        </Typography>
        <form>
          <Grid container spacing={2}>
            {Object.keys(clubData).map((attribute) => (
              <Grid item xs={12} sm={6} key={attribute}>
                <TextField
                  fullWidth
                  label={attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                  name={attribute}
                  variant="outlined"
                  onChange={handleChange}
                  value={clubData[attribute]}
                  style={{ marginBottom: "20px" }}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container justifyContent="center">
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleAddClub}
              style={{ marginTop: "20px" }}
            >
              Add Club
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddClub;
