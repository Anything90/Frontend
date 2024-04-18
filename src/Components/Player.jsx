import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button } from "@mui/material";

const columns = [
  {
    field: "playerEmail",
    headerName: "Email",
    width: 260,
    headerClassName: "active-header",
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 160,
    headerClassName: "active-header",
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
    headerClassName: "active-header",
  },
  {
    field: "active",
    headerName: "Active",
    width: 160,
    cellClassName: (params) =>
      params.value ? "active-cell-true" : "active-cell-false",
    headerClassName: "active-header",
  },
  {
    field: "role",
    headerName: "Role",
    width: 187,
    headerClassName: "active-header",
  },
  {
    field: "dominantHand",
    headerName: "Dominating Hand",
    width: 200,
    headerClassName: "active-header",
  },
];

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [selectedRows, setSelectedRows] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("/api/players/all-player-details");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleRowSelection = (event) => {
    console.log(event);
    setSelectedRows(event);
  };

  const handleDeleteSelectedRow = async () => {
    if (!selectedRows) return;

    try {
      const response = await axios.put(
        `/api/players/deactivePlayer?playerEmail=${selectedRows[0]}`
      );
      if (response.status === 200) {
        alert("Successfully Deactivated Player");
        fetchPlayers();
        setSelectedRows(null);
      }
    } catch (error) {
      console.error("Error deactivating player:", error);
    }
  };

  const handleActivateSelectedRow = async () => {
    if (selectedRows.length === 0) return;

    try {
      const response = await axios.put(
        `/api/players/activatePlayer?playerEmail=${selectedRows[0]}`
      );
      if (response.status === 200) {
        alert("Successfully Activated Player");
        fetchPlayers();
        setSelectedRows([]);
      }
    } catch (error) {
      console.error("Error activating player:", error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ width: "70%", margin: "auto" }}
    >
      <Grid container justifyContent="flex-end" sx={{ mt: 14, mr: 3, ml: -8 }}>
        <Button
          variant="contained"
          onClick={handleActivateSelectedRow}
          disabled={!selectedRows || Object.keys(selectedRows).length === 0}
          sx={{
            backgroundColor: "#FF7518",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#F28500",
              color: "black",
            },
            mr: 2,
          }}
        >
          Activate
        </Button>
        <Button
          variant="contained"
          onClick={handleDeleteSelectedRow}
          disabled={!selectedRows || Object.keys(selectedRows).length === 0}
          sx={{
            backgroundColor: "#FF7518",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#F28500",
              color: "black",
            },
          }}
        >
          Deactivate
        </Button>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <DataGrid
          rows={players}
          columns={columns}
          getRowId={(row) => row.playerEmail}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            },
          }}
          pageSizeOptions={[6, 12]}
          checkboxSelection
          onRowSelectionModelChange={(event) => handleRowSelection(event)}
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
    </Grid>
  );
};

export default Players;
