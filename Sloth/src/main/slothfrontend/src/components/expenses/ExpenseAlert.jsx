// components/ExpenseAlert.jsx
import React from "react";
import { Alert } from "@mui/material";

export default function ExpenseAlert({ alertStatus }) {
  if (alertStatus === null) return null;
  console.log("alertStatus received:", alertStatus);

  return (
    <Alert
      className="expense-creation-alert"
      variant="filled"
      severity={alertStatus === true ? "success" : "error"}
    >
      {alertStatus === true
        ? "Successfully created new expense."
        : "Failed to create expense."}
    </Alert>
  );
}
