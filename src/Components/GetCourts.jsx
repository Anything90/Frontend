import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

const columns = [
  {
    field: "clubId",
    headerName: "Club ID",
    width: 180,
    headerClassName: "active-header",
  },
  {
    field: "clubName",
    headerName: "Club Name",
    width: 180,
    headerClassName: "active-header",
  },
  {
    field: "active",
    headerName: "Active",
    width: 100,
    cellClassName: (params) =>
      params.value ? "active-cell-true" : "active-cell-false",
    headerClassName: "active-header",
  },
  {
    field: "clubCity",
    headerName: "Club City",
    width: 180,
    headerClassName: "active-header",
  },
  {
    field: "clubArea",
    headerName: "Club Area",
    width: 180,
    headerClassName: "active-header",
  },
  {
    field: "clubState",
    headerName: "Club State",
    width: 180,
    headerClassName: "active-header",
  },
  {
    field: "clubPincode",
    headerName: "PinCode",
    width: 180,
    headerClassName: "active-header",
  },
  {
    field: "clubAddress",
    headerName: "Club Address",
    width: 307,
    headerClassName: "active-header",
  },
];

const ClubDetails = () => {
  const [clubDetails, setClubDetails] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchClubDetails();
  }, []);

  const fetchClubDetails = async () => {
    try {
      const response = await axios.get("/api/club-and-court/all-club-details");
      const updatedClubDetails = response.data.map((club) => ({
        ...club,
        clubAddress: `${club.clubAddressLine1}, ${club.clubAddressLine2}`,
      }));
      setClubDetails(updatedClubDetails);
    } catch (error) {
      console.error("Error fetching club details:", error);
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
        `/api/club-and-court/shutdownClub?clubId=${selectedRows[0]}`
      );
      if (response.status === 200) {
        alert("Successfully Deactivated Club");
        fetchClubDetails();
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
        `/api/club-and-court/reopenClub?clubId=${selectedRows[0]}`
      );
      if (response.status === 200) {
        alert("Successfully Activated Club");
        fetchClubDetails();
        setSelectedRows([]);
      }
    } catch (error) {
      console.error("Error activating player:", error);
    }
  };

  return (
    <div style={{ height: 400, width: "97%" }}>
      <Grid container justifyContent="flex-end" sx={{ mt: 8, mr: 5, ml: -6 }}>
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
      <Grid sx={{ margin: 5 }}>
        <DataGrid
          rows={clubDetails}
          columns={columns}
          getRowId={(row) => row.clubId}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
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
    </div>
  );
};

const AddClub = () => {
  const [clubData, setClubData] = useState({
    clubName: "",
    clubArea: "",
    clubCity: "",
    clubAddressLine1: "",
    clubAddressLine2: "",
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
        clubArea: "",
        clubCity: "",
        clubAddressLine1: "",
        clubAddressLine2: "",
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
    <Container component="main" width="100%">
      <Paper elevation={3} sx={{ padding: 5, mt: 13 }}>
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
          variant="h3"
          align="center"
          sx={{
            padding: 2,
            mb: 2,
            color: "#4B125E",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Add Club
        </Typography>
        <form>
          <Grid container spacing={2}>
            {Object.keys(clubData).map((attribute) => (
              <Grid item xs={4} key={attribute}>
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
              sx={{
                backgroundColor: "#FF7518",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#F28500",
                  color: "black",
                },
              }}
            >
              Add Club
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

const ClubManagement = () => {
  return (
    <div>
      <AddClub />
      <ClubDetails />
    </div>
  );
};

export default ClubManagement;
