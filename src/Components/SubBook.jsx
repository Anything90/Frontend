import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SubBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  const handleClick = (item) => {
    console.log("sub card is Clicked");
    console.log(item.clubName);
    navigate(`/User/book/${id}/${item.clubName}`);
    axios
      .post(`/api/booking/selectClub?clubName=${item.clubName}`)
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/club-and-court/clubs?clubCity=${id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  return (
    <div>
      <Grid sx={{ mt: 12 }}>
        <h1
          style={{
            textAlign: "center",
            color: "#4B125E",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Subscribe to our Booking at {id}
        </h1>
      </Grid>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Grid container spacing={3}>
          {Array.isArray(data) &&
            data.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleClick(item)}
                >
                  <CardContent>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "#4B125E",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {item.clubName}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {item.clubArea}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.clubAddressLine1}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.clubAddressLine2}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.clubPincode}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default SubBook;
