import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const wallet = await axios.get("/api/wallet/details");
      setBalance(wallet.data.balance);
      setTransactions(wallet.data.transactions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRecharge = () => {
    setOpenModal(true);
  };

  const handleConfirmRecharge = () => {
    setOpenModal(false);
    axios
      .put(`/api/wallet/recharge?amount=${rechargeAmount}`)
      .then((response) => {
        console.log(rechargeAmount);
        console.log("Recharge successful:", response.data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error recharging wallet:", error);
      });
  };

  const handleCancelRecharge = () => {
    setOpenModal(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      sx={{ height: "100vh" }}
    >
      <Paper elevation={3} sx={{ p: 3, width: "300px" }}>
        <Typography
          variant="h4"
          sx={{
            color: "#4B125E",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            mb: 3,
          }}
        >
          Wallet
        </Typography>
        <Typography variant="h6">Balance: {balance}.rs</Typography>

        <Grid>
          <Typography variant="h6">Transaction History:</Typography>
          {transactions?.map((transaction) => (
            <Grid key={transaction.id}>
              <Typography>
                {transaction.type === "credit" ? "Credited" : "Debited"} $
                {transaction.amount} on {transaction.date}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#FF7518",
            color: "#FFF",
            "&:hover": {
              backgroundColor: "#F28500",
              color: "black",
            },
          }}
          onClick={handleRecharge}
        >
          Recharge Wallet
        </Button>
      </Paper>

      <Modal
        open={openModal}
        onClose={() => handleCancelRecharge}
        aria-labelledby="recharge-modal-title"
        aria-describedby="recharge-modal-description"
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
            width: "300px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6" id="recharge-modal-title" sx={{ mb: 2 }}>
            Enter Recharge Amount:
          </Typography>
          <TextField
            label="Amount"
            variant="outlined"
            type="number"
            value={rechargeAmount}
            onChange={(e) => setRechargeAmount(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Grid container justifyContent="space-between">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF7518",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#F28500",
                  color: "black",
                },
              }}
              onClick={handleCancelRecharge}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF7518",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#F28500",
                  color: "black",
                },
              }}
              onClick={handleConfirmRecharge}
            >
              Confirm
            </Button>
          </Grid>
        </Paper>
      </Modal>
    </Grid>
  );
};

export default Wallet;
