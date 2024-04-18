// Import necessary modules
import React, { useState, useEffect } from "react";
import { TextField, Grid, Paper, InputLabel, Button } from "@mui/material";
import axios from "axios";

const MyProfile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await axios.get(
          "/api/employees/profile-details"
        );
        setEmployeeData(employeeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("club")) {
      setEmployeeData((prevData) => ({
        ...prevData,
        clubId: {
          ...prevData.clubId,
          [name]: value,
        },
      }));
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/employees/edit-profile", employeeData);
      alert("Updated successfully");
      setEditMode(false);
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      container
      justify="center"
      sx={{
        mt: 14,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      <Grid item xs={6}>
        <Paper
          style={{
            padding: "30px 20px",
            width: 500,
            margin: "60px auto",
          }}
          elevation={4}
        >
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel
                  htmlFor="empFirstName"
                  sx={{ textAlign: "left", color: "black" }}
                >
                  First Name:
                </InputLabel>
                <TextField
                  id="empFirstName"
                  name="empFirstName"
                  value={employeeData.empFirstName}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  htmlFor="empLastName"
                  sx={{ textAlign: "left", color: "black" }}
                >
                  Last Name:
                </InputLabel>
                <TextField
                  id="empLastName"
                  name="empLastName"
                  value={employeeData.empLastName}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
            </Grid>
            <Grid sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="empEmail"
                sx={{ textAlign: "left", color: "black" }}
              >
                Email:
              </InputLabel>
              <TextField
                id="empEmail"
                name="empEmail"
                value={employeeData.empEmail}
                onChange={handleInputChange}
                fullWidth
                disabled={!editMode}
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ mt: 2 }}>
                <InputLabel
                  htmlFor="clubName"
                  sx={{ textAlign: "left", color: "black" }}
                >
                  ClubName:
                </InputLabel>
                <TextField
                  id="clubName"
                  name="clubName"
                  value={
                    employeeData.clubId ? employeeData.clubId.clubName : ""
                  }
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={6} sx={{ mt: 2 }}>
                <InputLabel
                  htmlFor="clubArea"
                  sx={{ textAlign: "left", color: "black" }}
                >
                  Club Area:
                </InputLabel>
                <TextField
                  id="clubArea"
                  name="clubArea"
                  value={
                    employeeData.clubId ? employeeData.clubId.clubArea : ""
                  }
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ mt: 2 }}>
                <InputLabel
                  htmlFor="clubCity"
                  sx={{ textAlign: "left", color: "black" }}
                >
                  City:
                </InputLabel>
                <TextField
                  id="clubCity"
                  name="clubCity"
                  value={
                    employeeData.clubId ? employeeData.clubId.clubCity : ""
                  }
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={6} sx={{ mt: 2 }}>
                <InputLabel
                  htmlFor="clubState"
                  sx={{ textAlign: "left", color: "black" }}
                >
                  State:
                </InputLabel>
                <TextField
                  id="clubState"
                  name="clubState"
                  value={
                    employeeData.clubId ? employeeData.clubId.clubState : ""
                  }
                  onChange={handleInputChange}
                  fullWidth
                  disabled={!editMode}
                />
              </Grid>
            </Grid>

            {editMode ? (
              <Button
                variant="contained"
                color="primary"
                type="button"
                sx={{
                  mt: 2,
                  backgroundColor: "#FF7518",
                  color: "#FFF",
                  "&:hover": {
                    backgroundColor: "#F28500",
                    color: "black",
                  },
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleEditClick}
                sx={{
                  mt: 2,
                  backgroundColor: "#FF7518",
                  color: "#FFF",
                  "&:hover": {
                    backgroundColor: "#F28500",
                    color: "black",
                  },
                }}
              >
                Edit
              </Button>
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MyProfile;
