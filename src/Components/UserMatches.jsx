import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";

const columns = [
  {
    field: "matchId",
    headerName: "Match ID",
    width: 100,
    headerClassName: "active-header",
  },
  {
    field: "matchStatus",
    headerName: "Match Status",
    width: 120,
    cellClassName: (params) =>
      params.value === "ENDED" ? "active-cell-false" : "active-cell-true",
    headerClassName: "active-header",
  },
  {
    field: "teamOneName",
    headerName: "1st Team Name",
    width: 150,
    headerClassName: "active-header",
  },
  {
    field: "teamOnePlayer1",
    headerName: "1st Team Player 1",
    width: 170,
    headerClassName: "active-header",
  },
  {
    field: "teamOnePlayer2",
    headerName: "1st Team Player 2",
    width: 170,
    headerClassName: "active-header",
  },
  {
    field: "teamTwoName",
    headerName: "2nd Team Name",
    width: 150,
    headerClassName: "active-header",
  },
  {
    field: "teamTwoPlayer1",
    headerName: "2nd Team Player 1",
    width: 170,
    headerClassName: "active-header",
  },
  {
    field: "teamTwoPlayer2",
    headerName: "2nd Team Player 2",
    width: 170,
    headerClassName: "active-header",
  },
  {
    field: "teamOneScore",
    headerName: "1st Team Score",
    type: "number",
    width: 110,
    headerClassName: "active-header",
  },
  {
    field: "teamTwoScore",
    headerName: "2nd Team Score",
    type: "number",
    width: 120,
    headerClassName: "active-header",
  },
  {
    field: "winnerTeam",
    headerName: "Winner",
    width: 145,
    headerClassName: "active-header",
  },
];

function UserMatches() {
  const [userMatches, setUserMatches] = useState([]);

  useEffect(() => {
    fetchUserMatches();
  }, []);

  const fetchUserMatches = async () => {
    try {
      const response = await axios.get("/api/match/getallPlayerMatches");
      setUserMatches(response.data);
    } catch (error) {
      console.error("Error fetching userMatches:", error);
    }
  };

  return (
    <div style={{ width: "98%" }}>
      <Grid sx={{ mt: 14, ml: 5, mr: 5 }}>
        <DataGrid
          rows={userMatches}
          columns={columns}
          getRowId={(row) => row.matchId}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          pageSizeOptions={[8, 16]}
          classes={{ cell: "custom-cell", headerCell: "custom-header" }}
        />
      </Grid>
      <style>
        {`
          .active-header {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            background-color: #6A1F8E;
            color:#ffff
          }
          .active-cell-true {
            color: green;
          }
          .active-cell-false {
            color: red;
          }
        `}
      </style>
    </div>
  );
}

export default UserMatches;
