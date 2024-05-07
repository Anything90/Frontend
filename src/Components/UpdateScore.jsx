import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UpdateScore = () => {
  const navigate = useNavigate();
  const matchToken = localStorage.getItem("matchToken");
  const [scoreData, setScoreData] = useState({
    matchToken: matchToken,
    teamOneScore: 0,
    teamTwoScore: 0,
  });

  const [updatedScores, setUpdatedScores] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = Math.max(0, parseFloat(value));

    setScoreData((prevData) => ({ ...prevData, [name]: sanitizedValue }));
  };

  const handleUpdateScore = async () => {
    try {
      const response = await axios.put(
        `/api/match/updateScore?matchToken=${scoreData.matchToken}&teamOneScore=${scoreData.teamOneScore}&teamTwoScore=${scoreData.teamTwoScore}`
      );
      setMessage({ type: "success", text: "Score Updated!" });

      setUpdatedScores({
        teamOneScore: response.data.teamOneScore,
        teamTwoScore: response.data.teamTwoScore,
      });
      setScoreData({
        matchToken: scoreData.matchToken,
        teamOneScore: 0,
        teamTwoScore: 0,
      });
    } catch (error) {
      console.error("Error updating score:", error);
      setMessage({
        type: "danger",
        text: "Failed to update the match score.",
      });
    }
  };

  const handleEndMatch = async () => {
    try {
      const response = await axios.put(
        `/api/match/end?matchToken=${scoreData.matchToken}`
      );
      console.log(response.data);
      setMessage({ type: "success", text: "Match Ended successfully!" });

      setUpdatedScores({
        teamOneScore: "",
        teamTwoScore: "",
      });
      setScoreData({
        matchToken: "",
        teamOneScore: 0,
        teamTwoScore: 0,
      });
      setTimeout(() => {
        navigate("/Supervisor/startMatch");
      }, 1000);
    } catch (error) {
      console.error("Error updating score:", error);
      setMessage({
        type: "danger",
        text: "Failed to End the match.",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 14 }}>
      <Paper
        elevation={3}
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {message && (
          <Typography
            variant="body2"
            color={message.type === "success" ? "success" : "error"}
            style={{ marginTop: "15px" }}
          >
            {message.text}
          </Typography>
        )}
        <Typography
          component="h1"
          variant="h4"
          sx={{
            padding: 3,
            color: "#4B125E",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Update Score
        </Typography>
        <form style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Match Token"
                name="matchToken"
                value={scoreData.matchToken}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                min={0}
                label="Team One Score"
                name="teamOneScore"
                value={scoreData.teamOneScore}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Team Two Score"
                name="teamTwoScore"
                min={0}
                value={scoreData.teamTwoScore}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleUpdateScore}
              sx={{
                backgroundColor: "#FF7518",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#F28500",
                  color: "black",
                },
              }}
            >
              Update Score
            </Button>
          </Grid>

          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleEndMatch}
              sx={{
                backgroundColor: "#FF7518",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#F28500",
                  color: "black",
                },
              }}
            >
              End Match
            </Button>
          </Grid>
        </form>

        {updatedScores && (
          <div style={{ marginTop: 20 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#4B125E",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Updated Scores: Team One - {updatedScores.teamOneScore}, Team Two
              -{updatedScores.teamTwoScore}
            </Typography>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default UpdateScore;
