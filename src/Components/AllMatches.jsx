import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "matchId",
    headerName: "MatchID",
    width: 200,
    headerClassName: "active-header",
  },
  {
    field: "matchStatus",
    headerName: "Match Status",
    width: 150,
    cellClassName: (params) =>
      params.value === "ENDED" ? "active-cell-ended" : "active-cell-started",
    headerClassName: "active-header",
  },
  {
    field: "teamOneName",
    headerName: "1st Team Name",
    width: 160,
    headerClassName: "active-header",
  },
  {
    field: "teamTwoName",
    headerName: "2nd Team Name",
    width: 160,
    headerClassName: "active-header",
  },
  {
    field: "teamOneScore",
    headerName: "1st Team Score",
    type: "number",
    width: 152,
    headerClassName: "active-header",
  },
  {
    field: "teamTwoScore",
    headerName: "2nd Team Score",
    type: "number",
    width: 150,
    headerClassName: "active-header",
  },
  {
    field: "winnerTeam",
    headerName: "Winner",
    width: 180,
    headerClassName: "active-header",
  },
];

function AllMatches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch matches when the component mounts
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get("/api/match/summary");
      console.log(response.data);
      setMatches(response.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ width: "70%", margin: "auto" }}
    >
      <Grid
        sx={{
          mt: 14,
        }}
      >
        <DataGrid
          rows={matches}
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
          .active-cell-started {
            color: lightgreen;
          }
          .active-cell-ended {
            color: lightcoral;
          }
        `}
      </style>
    </Grid>
  );
}

export default AllMatches;
