import {
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Details() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [availableCourts, setAvailableCourts] = useState(null);
  const [selectedCourts, setSelectedCourts] = useState([]);
  const [matchType, setMatchType] = useState("");
  const [selectedCourtIndex, setSelectedCourtIndex] = useState(null);

  const handleChange = (event) => {
    setMatchType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(selectedDate);
    console.log(selectedTimeSlot);
    try {
      const response = await axios.post(
        `/api/booking/selectTimeSlot?timeSlot=${selectedTimeSlot}&matchDate=${selectedDate}`
      );
      setAvailableCourts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleCourtClick = (court, index) => {
    setSelectedCourts([court]);
    setSelectedCourtIndex(index);
  };

  const handleAddToCart = async () => {
    if (selectedCourts.length === 0) {
      console.error("No court selected");
      return;
    }

    const courtId = selectedCourts[0].courtId;
    try {
      const response = await axios.post(
        `/api/booking/selectCourt?courtId=${courtId}&matchType=${matchType}`
      );
      const bookingDetails = response.data;
      console.log(bookingDetails);

      navigate("/User/cart", { state: { bookingDetails } });
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  return (
    <Grid
      container
      justify="center"
      sx={{
        mt: 14,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Paper
          style={{
            padding: "30px 20px",
            width: 450,
            margin: "60px auto",
          }}
          elevation={4}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              color: "#4B125E",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            {title}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              xs={12}
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "row",
                textAlign: "center",
              }}
            >
              <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", mt: 2, color: "black" }}
                >
                  Date:
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  type="date"
                  sx={{ width: 200 }}
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  inputProps={{ min: new Date().toISOString().split("T")[0] }}
                />
              </Grid>
            </Grid>
            <Grid container xs={12} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", mt: 2, color: "black" }}
                >
                  Time Slot:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Select
                  labelId="time-slot"
                  id="time-slot"
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  required
                  sx={{ width: 200 }}
                >
                  <MenuItem value="09:00AM-11:00AM">09:00AM-11:00AM</MenuItem>
                  <MenuItem value="11:00AM-01:00PM">11:00AM-01:00PM</MenuItem>
                  <MenuItem value="02:00PM-04:00PM">02:00PM-04:00PM</MenuItem>
                  <MenuItem value="04:00PM-06:00PM">04:00PM-06:00PM</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 4 }}>
              <Button
                type="submit"
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
                Check Availability
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Paper
          style={{
            padding: "30px 20px",
            width: 450,
            margin: "60px auto",
          }}
          elevation={4}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 4,
              color: "#4B125E",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            SELECT COURT
          </Typography>
          <Grid container spacing={2} sx={{ ml: 3 }} alignContent="center">
            {Array.isArray(availableCourts) &&
              availableCourts.map((item, index) => (
                <Grid item key={item.courtId}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedCourtIndex === index ? "#F28500" : "white",
                      "&:hover": {
                        backgroundColor: "#F28500",
                      },
                    }}
                    onClick={() => handleCourtClick(item, index)}
                  >
                    <CardContent>
                      <Typography variant="h6" component="div">
                        COURT{item.courtId}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography id="matchType" variant="h6">
                Match Type:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Select
                labelId="matchType"
                id="matchType"
                value={matchType}
                onChange={handleChange}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="SINGLES">SINGLES </MenuItem>
                <MenuItem value="DOUBLES">DOUBLES</MenuItem>
              </Select>
            </Grid>
          </Grid>
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
            onClick={handleAddToCart}
          >
            ADD TO CART
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Details;
