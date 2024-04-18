import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button } from "@mui/material";

const columns = [
  {
    field: "empEmail",
    headerName: "Email",
    width: 220,
    headerClassName: "active-header",
  },
  {
    field: "empFirstName",
    headerName: "First Name",
    width: 120,
    headerClassName: "active-header",
  },
  {
    field: "empLastName",
    headerName: "Last Name",
    width: 118,
    headerClassName: "active-header",
  },
  {
    field: "empRole",
    headerName: "Role",
    width: 170,
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
    field: "clubId",
    headerName: "Club ID",
    width: 95,
    headerClassName: "active-header",
  },
  {
    field: "clubName",
    headerName: "Club Name",
    width: 110,
    headerClassName: "active-header",
  },
  {
    field: "clubCity",
    headerName: "Club City",
    width: 120,
    headerClassName: "active-header",
  },
  {
    field: "clubArea",
    headerName: "Club Area",
    width: 116,
    headerClassName: "active-header",
  },
  {
    field: "clubState",
    headerName: "Club State",
    width: 120,
    headerClassName: "active-header",
  },
  {
    field: "address",
    headerName: "Club Address",
    width: 300,
    headerClassName: "active-header",
  },
];

const Employees = () => {
  const [employee, setEmployee] = useState([]);
  const [selectedRows, setSelectedRows] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get("/api/employees/all-Employee-details");
      const updatedEmployee = response.data.map((player) => ({
        ...player,
        address: `${player.clubId.clubAddressLine1}, ${player.clubId.clubAddressLine2}`,
        clubId: `${player.clubId.clubId}`,
        clubState: `${player.clubId.clubState}`,
        clubArea: `${player.clubId.clubArea}`,
        clubCity: `${player.clubId.clubCity}`,
        clubName: `${player.clubId.clubName}`,
      }));
      setEmployee(updatedEmployee);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleRowSelection = (event) => {
    setSelectedRows(event);
  };

  const handleDeleteSelectedRow = async () => {
    if (!selectedRows) return;

    try {
      const response = await axios.put(
        `/api/employees/deactiveEmployee?empEmail=${selectedRows[0]}`
      );
      if (response.status === 200) {
        alert("Successfully Deactivated Employee");
        fetchEmployee();
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
        `/api/employees/activateEmployee?empEmail=${selectedRows[0]}`
      );
      if (response.status === 200) {
        alert("Successfully Activated Employee");
        fetchEmployee();
        setSelectedRows([]);
      }
    } catch (error) {
      console.error("Error activating employee:", error);
    }
  };

  return (
    <div style={{ width: "98%" }}>
      <Grid container justifyContent="flex-end" sx={{ mt: 14, mr: 3, ml: -2 }}>
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
      <Grid sx={{ mt: 3, ml: 1, mr: 1 }}>
        <DataGrid
          rows={employee}
          columns={columns}
          getRowId={(row) => row.empEmail}
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
            color: #ffffff;
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

export default Employees;
