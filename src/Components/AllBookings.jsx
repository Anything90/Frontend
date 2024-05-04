import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";

const columns = [
  {
    field: "bookingId",
    headerName: "BookingID",
    width: 200,
    headerClassName: "active-header",
  },
  {
    field: "bookingDate",
    headerName: "Booking Date",
    width: 140,
    headerClassName: "active-header",
  },
  {
    field: "bookingStatus",
    headerName: "Booking Status",
    width: 150,
    cellClassName: (params) =>
      params.value === "BOOKED" ? "active-cell-true" : "active-cell-false",
    headerClassName: "active-header",
  },
  {
    field: "clubName",
    headerName: "Club Name",
    width: 140,
    headerClassName: "active-header",
  },
  {
    field: "courtId",
    headerName: "CourtID",
    type: "number",
    width: 100,
    headerClassName: "active-header",
  },
  {
    field: "startTime",
    headerName: "Start Time",
    width: 140,
    headerClassName: "active-header",
  },
  {
    field: "endTime",
    headerName: "End Time",
    width: 140,
    headerClassName: "active-header",
  },
  {
    field: "matchType",
    headerName: "Match Type",
    width: 140,
    headerClassName: "active-header",
  },
  {
    field: "matchDate",
    headerName: "Match Date",
    width: 140,
    headerClassName: "active-header",
  },
  {
    field: "paymentId",
    headerName: "PaymentID",
    headerClassName: "active-header",
    width: 180,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    headerClassName: "active-header",
  },
];

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/booking/getallbookings");
      const updatedBookings = response.data.map((book) => ({
        ...book,
        paymentId: book.paymentId ? `${book.paymentId.id}` : null,
        bookingStatus: `${book.bookingStatus}`,
      }));
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleRowSelection = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
    console.log(selectedRows.length);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ width: "94%", margin: "auto" }}
    >
      <Grid sx={{ mt: 14 }}>
        <DataGrid
          rows={bookings}
          columns={columns}
          getRowId={(row) => row.bookingId}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          pageSizeOptions={[8, 16]}
          onSelectionModelChange={handleRowSelection}
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

export default AllBookings;
