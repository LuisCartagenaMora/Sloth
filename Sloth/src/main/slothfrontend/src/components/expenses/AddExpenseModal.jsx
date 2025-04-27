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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import createExpense from "../../js/AddExpenseButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="modal-text-field"
                id="filled-required"
                onChange={(value) => {
                  setDate(value.format("MM-DD-YYYY"));
                }}
              />
            </LocalizationProvider>
            {/* <TextField
              className="modal-text-field"
              required
              id="filled-required"
              label="Date"
              variant="filled"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            /> */}
            <TextField
              className="modal-text-field"
              required
              id="filled-required"
              label="Amount"
              variant="filled"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Expense Category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <MenuItem value={"Housing"}>Housing</MenuItem>
                <MenuItem value={"Utilities"}>Utilities</MenuItem>
                <MenuItem value={"Transportation"}>Transportation</MenuItem>
                <MenuItem value={"Food & Groceries"}>Food & Groceries</MenuItem>
                <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                <MenuItem value={"Health & Fitness"}>Health & Fitness</MenuItem>
                <MenuItem value={"Personal Care & Hygeine"}>
                  Personal Care & Hygeine
                </MenuItem>
                <MenuItem value={"Clothing"}>Clothing</MenuItem>
                <MenuItem value={"Education"}>Education</MenuItem>
                <MenuItem value={"Childcare & Kids"}>Childcare & Kids</MenuItem>
                <MenuItem value={"Travel"}>Travel</MenuItem>
                <MenuItem value={"Gifts"}>Gifts</MenuItem>
                <MenuItem value={"Saving & Instruments"}>
                  Saving & Instruments
                </MenuItem>
                <MenuItem value={"Insurance"}>Insurance</MenuItem>
                <MenuItem value={"Debt Repayment"}>Debt Repayment</MenuItem>
                <MenuItem value={"Pets"}>Pets</MenuItem>
                <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
                <MenuItem value={"Miscellaneous"}>Miscellaneous</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField
              className="modal-text-field"
              required
              id="filled-required"
              label="Enter the expense's category"
              variant="filled"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            /> */}

            <TextField
              className="modal-text-field"
              required
              id="filled-required"
              label="Description"
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
