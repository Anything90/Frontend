import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StartMatch = () => {
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState({
    matchToken: "",
    teamOneName: "",
    teamTwoName: "",
    teamOnePlayer1: "",
    teamOnePlayer2: "",
    teamTwoPlayer1: "",
    teamTwoPlayer2: "",
  });
  const [matchType, setMatchType] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "matchType") {
      setMatchType(value);
    } else {
      setMatchData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleStartMatch = async () => {
    try {
      const response = await axios.post(
        `/api/match/start?matchToken=${matchData.matchToken}&teamOneName=${matchData.teamOneName}&teamTwoName=${matchData.teamTwoName}&teamOnePlayer1=${matchData.teamOnePlayer1}&teamOnePlayer2=${matchData.teamOnePlayer2}&teamTwoPlayer1=${matchData.teamTwoPlayer1}&teamTwoPlayer2=${matchData.teamTwoPlayer2}`
      );

      console.log(response.data);

      setMatchData({
        matchToken: "",
        teamOneName: "",
        teamTwoName: "",
        teamOnePlayer1: "",
        teamOnePlayer2: "",
        teamTwoPlayer1: "",
        teamTwoPlayer2: "",
      });
      setMatchType(null);
      setMessage({ type: "success", text: "Match started successfully!" });
      let matchToken = matchData.matchToken;
      localStorage.setItem("matchToken", matchToken);
      setTimeout(() => {
        navigate("/Supervisor/updateScore");
      }, 1000);
    } catch (error) {
      console.error("Error starting match:", error);
      setMessage({
        type: "danger",
        text: "Failed to start the match.Please fill all the fields",
      });
    }
  };

  const renderPlayerFields = () => {
    if (matchType === "doubles") {
      return (
        <>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Player 1"
              name="teamOnePlayer1"
              value={matchData.teamOnePlayer1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Player 2"
              name="teamOnePlayer2"
              value={matchData.teamOnePlayer2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Player 1"
              name="teamTwoPlayer1"
              value={matchData.teamTwoPlayer1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Player 2"
              name="teamTwoPlayer2"
              value={matchData.teamTwoPlayer2}
              onChange={handleChange}
            />
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Player 1"
              name="teamOnePlayer1"
              value={matchData.teamOnePlayer1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Player 2"
              name="teamTwoPlayer1"
              value={matchData.teamTwoPlayer1}
              onChange={handleChange}
            />
          </Grid>
        </>
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
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
          Start Match
        </Typography>
        <form style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Match Token"
                  name="matchToken"
                  value={matchData.matchToken}
                  onChange={handleChange}
                />
              </Grid>
            </>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="match-type-label">Match Type</InputLabel>
                <Select
                  labelId="match-type-label"
                  label="Match Type"
                  name="matchType"
                  value={matchType}
                  onChange={handleChange}
                  required
                  MenuProps={{ MenuListProps: { disablePadding: true } }}
                >
                  <MenuItem value="singles">Singles</MenuItem>
                  <MenuItem value="doubles">Doubles</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Team One Name"
                  name="teamOneName"
                  value={matchData.teamOneName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Team Two Name"
                  name="teamTwoName"
                  value={matchData.teamTwoName}
                  onChange={handleChange}
                />
              </Grid>
            </>
            {renderPlayerFields()}
          </Grid>
          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleStartMatch}
              sx={{
                backgroundColor: "#FF7518",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#F28500",
                  color: "black",
                },
              }}
            >
              Start Match
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default StartMatch;
