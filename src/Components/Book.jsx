import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Container,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import bangalore from "./Images/Bangalore.jpg";
import chennai from "./Images/chennai.png";
import Hyderabad from "./Images/Hyderabad.jpg";
import Cochin from "./Images/Kochin.jpg";
import Trivandrum from "./Images/Trivandrum.jpg";
import Mysore from "./Images/Mysore.jpg";
import Delhi from "./Images/Delhi.jpg";
import Mangalore from "./Images/Mangalore.jpg";
import Madurai from "./Images/Madurai.png";
import Trichy from "./Images/trichy.png";
import Pondicherry from "./Images/Pondi.jpg";
import Mumbai from "./Images/Mumbai.png";
import SearchIcon from "@mui/icons-material/Search";

const data = [
  {
    id: 1,
    title: "Bangalore",
    image: bangalore,
  },
  {
    id: 2,
    title: "Chennai",
    image: chennai,
  },
  {
    id: 3,
    title: "Hyderabad",
    image: Hyderabad,
  },
  {
    id: 4,
    title: "Cochin",
    image: Cochin,
  },
  {
    id: 5,
    title: "Trivandrum",
    image: Trivandrum,
  },
  {
    id: 6,
    title: "Mysore",
    image: Mysore,
  },
  {
    id: 7,
    title: "Delhi",
    image: Delhi,
  },
  {
    id: 8,
    title: "Mangalore",
    image: Mangalore,
  },
  {
    id: 9,
    title: "Madurai",
    image: Madurai,
  },
  {
    id: 10,
    title: "Trichy (Tiruchirapalli)",
    image: Trichy,
  },
  {
    id: 11,
    title: "Pondicherry",
    image: Pondicherry,
  },
  {
    id: 12,
    title: "Mumbai",
    image: Mumbai,
  },
];

function Book() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (item) => {
    console.log("clicked!");
    console.log(`${item.id}`);
    navigate(`/User/book/${item.title}`);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 14,
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          endAdornment: (
            <SearchIcon sx={{ color: "action.active", cursor: "pointer" }} />
          ),
        }}
      />

      <Grid container spacing={3}>
        {filteredData.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card onClick={() => handleClick(item)} sx={{ cursor: "pointer" }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "255px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "#4B125E" }}
                >
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Book;
