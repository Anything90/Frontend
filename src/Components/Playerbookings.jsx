import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState, useEffect } from "react";

const columns = [
  {
    field: "bookingId",
    headerName: "BookingID",
    width: 140,
    headerClassName: "active-header",
  },
  {
    field: "bookingDate",
    headerName: "Booking Date",
    width: 120,
    headerClassName: "active-header",
  },
  {
    field: "bookingStatus",
    headerName: "Booking Status",
    width: 120,
    cellClassName: (params) =>
      params.value === "BOOKED" ? "active-cell-true" : "active-cell-false",
    headerClassName: "active-header",
  },
  {
    field: "clubName",
    headerName: "Club Name",
    width: 100,
    headerClassName: "active-header",
  },
  {
    field: "courtId",
    headerName: "CourtID",
    type: "number",
    width: 80,
    headerClassName: "active-header",
  },
  {
    field: "matchToken",
    headerName: "Match Token",
    width: 110,
    headerClassName: "active-header",
  },
  {
    field: "startTime",
    headerName: "Start Time",
    width: 120,
    headerClassName: "active-header",
  },
  {
    field: "endTime",
    headerName: "End Time",
    width: 120,
    headerClassName: "active-header",
  },
  {
    field: "matchType",
    headerName: "Match Type",
    width: 120,
    headerClassName: "active-header",
  },
  {
    field: "matchDate",
    headerName: "Match Date",
    width: 120,
    headerClassName: "active-header",
  },
  {
    field: "paymentId",
    headerName: "PaymentID",
    // valueGetter: (params) =>
    //   params.row.paymentId ? params.row.paymentId.id : "",
    width: 200,
    headerClassName: "active-header",
  },
  {
    field: "paymentStatus",
    headerName: "PaymentStatus",
    // valueGetter: (params) =>
    //   params.row.paymentId ? params.row.paymentId.paymentStatus : "",
    width: 130,
    cellClassName: (params) =>
      params.value === "SUCCESS" ? "active-cell-true" : "active-cell-false",
    headerClassName: "active-header",
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 129,
    headerClassName: "active-header",
  },
];

function Playerbookings() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get("/api/booking/getallPlayerbookings");
      const playerBookings = response.data.map((book) => ({
        ...book,
        paymentId: `${book.paymentId.id}`,
        paymentStatus: `${book.paymentId.paymentStatus}`,
      }));
      setPlayers(playerBookings);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Grid sx={{ mt: 14, ml: 5, mr: 5 }}>
        <DataGrid
          rows={players}
          columns={columns}
          getRowId={(row) => row.bookingId}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
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

export default Playerbookings;
