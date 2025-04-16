// AddExpenseModal.jsx
import * as React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Icon,
  Backdrop,
  TextField,
  Alert,
} from "@mui/material";
import createExpense from "../../js/AddExpenseButton";

export default function AddExpenseModal({ onStatusChange, userId }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  // const [expenseStatus, setExpenseStatus] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleExpense = () => {
    createExpense(userId, date, amount, category, description).then(
      (status) => {
        // setExpenseStatus(status);
        console.log("Expense creation status:", status);
        onStatusChange(status);
      }
    );
  };

  return (
    <>
      <Button
        variant="transparent"
        onClick={() => {
          handleOpen();
        }}
      >
        <Icon fontSize="small">add_circle</Icon>
        Add Expense
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            border: 1,
            m: { xs: 15, sm: 25, md: 45, lg: 45, xl: 55 },
            height: { xs: 15, sm: 25, md: 400, lg: 45, xl: 55 },
            width: { xs: 15, sm: 25, md: 350, lg: 45, xl: 55 },
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter expense information
          </Typography>
          <div className="modal-text-field-box" sx={{ m: 1, width: "25ch" }}>
            {/* <TextField
              className="modal-text-field"
              required
              id="filled-required"
              label="Enter current user's id"
              variant="filled"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            /> */}
            <TextField
              className="modal-text-field"
              required
              id="filled-required"
              label="Enter the expense's date"
              variant="filled"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <TextField
              className="modal-text-field"
              required
              id="filled-required"
              label="Enter the expense's amount"
              variant="filled"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <TextField
              className="modal-text-field"
              required
              id="filled-required"
              label="Enter the expense's category"
              variant="filled"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />

            <TextField
              className="modal-text-field"
              required
              id="filled-required"
              label="Enter the expense's description"
              variant="filled"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <Button
            color="primary"
            onClick={() => {
              handleExpense();

              setOpen(false);
            }}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </>
  );
}
