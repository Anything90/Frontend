import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  LineChart,
  Line,
  // BarChart,
  // Bar,
  XAxis,
  YAxis,
  // CartesianGrid,
} from "recharts";

const Cards = ({ title, content }) => {
  return (
    <Card style={{ width: "450px", height: "150px" }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: "#4B125E",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h3"
          color="black"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Leaderboard = ({ title, data }) => {
  return (
    <Card sx={{ width: "300px", height: "380px" }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          align="center"
          sx={{
            mb: 2,
            color: "#4B125E",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          {title}
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Email
            </Typography>
          </Grid>
          <Grid item>
            {title === "Top Winnings" ? (
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Wins
              </Typography>
            ) : (
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Points
              </Typography>
            )}
          </Grid>
        </Grid>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {data.map((item, index) => (
            <li
              key={index} // Ensure unique key for each list item
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Typography>{item.email}</Typography>
              <Typography fontWeight="bold">{item.value}</Typography>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

function Analytics() {
  const [pieChartData, setPieChartData] = useState([]);
  const [dailyBookings, setDailyBookings] = useState({});
  const [topWinnings, setTopWinnings] = useState([]);
  const [topMatchPoint, setTopMatchPoint] = useState([]);
  const [revenue, setRevenue] = useState([]);
  // const [weeksBooking, setWeeksBooking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/payment/revenueByCities");
        const responseData = Object.entries(response.data).map(
          ([name, value]) => ({ name, value })
        );
        setPieChartData(responseData);

        const response1 = await axios.get("/api/payment/daily-booking-details");
        setDailyBookings(response1.data);

        const response2 = await axios.get("/api/payment/lastSixMonthRev");
        const lastSixMonthRev = Object.entries(response2.data).map(
          ([name, value]) => ({ name, value })
        );
        setRevenue(lastSixMonthRev);

        // const response3 = await axios.get(
        //   "/api/payment/bookingCountOfMonthAndWeek"
        // );
        // setWeeksBooking(response3.data);
        // const formattedWeeks = Object.entries(response3.data).map(
        //   ([month, monthData]) => ({ name: month, data: monthData })
        // );

        // setWeeksBooking(formattedWeeks);

        const response4 = await axios.get(
          "/api/match/top-10-playersWithWinnings"
        );
        const formattedTopWinnings = Object.entries(response4.data).map(
          ([email, value]) => ({
            email,
            value,
          })
        );
        setTopWinnings(formattedTopWinnings);

        const response5 = await axios.get(
          "/api/match/top-10-playersWithMatchPoint"
        );
        const formattedTopMatchPoints = Object.entries(response5.data).map(
          ([email, value]) => ({
            email,
            value,
          })
        );
        setTopMatchPoint(formattedTopMatchPoints);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Grid item>
          <Cards
            title="Today's Bookings"
            content={`${dailyBookings.numberOfBookings || 0}`}
          />
        </Grid>
        <Grid item>
          <Cards
            title="Today's Revenue"
            content={`${dailyBookings.revenue || 0}`}
          />
        </Grid>
        <Grid item>
          <Cards
            title="Today's Unused Court"
            content={`${dailyBookings.unusedCourtCount || 0}`}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid
          item
          sx={{ display: "flex", justifyContent: "flex-start", mr: 3, ml: 6 }}
        >
          <Card style={{ width: "920px", height: "380px" }}>
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  mb: 2,
                  color: "#4B125E",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                Revenue Trend
              </Typography>
              <LineChart width={840} height={300} data={revenue}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sx={{ justifyContent: "flex-end" }}>
          <Grid container spacing={2}>
            <Grid item>
              <Leaderboard title="Top Winnings" data={topWinnings} />
            </Grid>
            <Grid item>
              <Leaderboard title="Top Match Points" data={topMatchPoint} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{ mt: 4, display: "flex", justifyContent: "flex-end", mr: 6 }}
      >
        <Card style={{ width: "620px", height: "440px" }}>
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              sx={{
                mb: 3,
                color: "#4B125E",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              Revenue By Cities
            </Typography>
            <PieChart width={580} height={350} margin={{ left: 10 }}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={135}
                fill="#8884d8"
                label={(entry) => entry.name}
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default Analytics;
