import React, { useContext } from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Box,
  Chip,
  Stack,
  Divider,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Pagination,
  Icon,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import AddExpenseModal from "./AddExpenseModal";
import deleteButton from "../../js/DeleteExpenseButton";
import ExpenseContext from "./ExpenseContext";

export default function ExpenseList({ onStatusChange, userId }) {
  // const [expenses, setExpenses] = useState([]);
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [numberOfPages, setNumberOfPages] = useState("");
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    currentPage: 1,
  });

  const getPaginatedExpenses = () => {
    const startIndex = pagination.offset;
    const endIndex = pagination.offset + pagination.limit;
    return expenses.slice(startIndex, endIndex);
  };

  const listOfExpenses = getPaginatedExpenses();

  useEffect(() => {
    setNumberOfPages(Math.ceil(expenses.length / 10));
  });

  const handleAlertStatus = (value) => {
    onStatusChange(value);
  };

  return (
    <Box
      sx={{
        padding: 3.7,
        minWidth: { md: 500 },
        maxWidth: { md: 40 },
      }}
    >
      <Stack
        className="expense-list-stack"
        divider={<Divider sx={{ marginTop: 0 }} />}
      >
        <Card variant="outlined">
          <Typography
            className="expense-list-header"
            variant="h5"
            component="p"
          >
            Expenses
            <AddExpenseModal
              userId={userId}
              onStatusChange={(value) => {
                handleAlertStatus(value);
              }}
            />
          </Typography>
          {listOfExpenses.length === 0 && (
            <Typography
              variant="h6"
              component="p"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No expenses available.
            </Typography>
          )}

          {listOfExpenses.length !== 0 && (
            <Typography className="expense-list">
              <Stack className="expense-list-stack" spacing={2}>
                {listOfExpenses.map((expense) => (
                  <Typography key={expense.expenseId}>
                    <Stack direction="row" spacing={1} />
                    <Tooltip title="Expense Category">
                      <Chip
                        className="individual-expense-chip"
                        label={expense.category}
                      />
                    </Tooltip>
                    <Tooltip title="Expense Date">
                      <Chip
                        className="individual-expense-chip"
                        label={expense.date}
                      />
                    </Tooltip>

                    <Typography
                      className="individual-expense"
                      variant="h6"
                      component="p"
                    >
                      <Tooltip title="Expense Description">
                        {expense.description}
                      </Tooltip>
                      <Tooltip title="Expense Amount">
                        <Typography>
                          <span>${expense.amount}</span>
                        </Typography>
                      </Tooltip>

                      <Button
                        className="expenses-delete-button"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => deleteButton(expense.expenseId)}
                      >
                        <span>Delete</span>
                      </Button>
                    </Typography>
                  </Typography>
                ))}
              </Stack>
            </Typography>
          )}
        </Card>
      </Stack>
      {listOfExpenses.length > 0 && (
        <Stack spacing={2} sx={{ display: "flex", direction: "row" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            {pagination.currentPage > 1 && (
              <IconButton
                className="PaginationPrevButton"
                variant="text"
                aria-label="Left arrow"
                sx={{ width: "20px" }}
                onClick={() => {
                  const prevOffset = pagination.offset - 10;
                  const prevPage = pagination.currentPage - 1;
                  setPagination({
                    ...pagination,
                    offset: prevOffset,
                    currentPage: prevPage,
                  });
                }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
            )}
            <span>Page {pagination.currentPage}</span>
            {pagination.currentPage < numberOfPages && (
              <IconButton
                className="PaginationNextButton"
                variant="contained"
                aria-label="Right arrow"
                sx={{ width: "20px" }}
                onClick={() => {
                  const nextOffset = pagination.offset + 10;
                  const nextPage = pagination.currentPage + 1;
                  setPagination({
                    ...pagination,
                    offset: nextOffset,
                    currentPage: nextPage,
                  });
                }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            )}
          </Box>
        </Stack>
      )}
    </Box>
  );
}
