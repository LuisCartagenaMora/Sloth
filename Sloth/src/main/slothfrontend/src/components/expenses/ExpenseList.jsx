import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Box,
  Chip,
  Stack,
  Divider,
  Typography,
  Button,
  Tooltip,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddExpenseModal from "./AddExpenseModal";
import deleteButton from "../../js/DeleteExpenseButton";

export default function ExpenseList({ onStatusChange, userId }) {
  const queryClient = useQueryClient();

  const [expenses, setExpenses] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState("");
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    currentPage: 1,
  });

  useEffect(() => {
    const fetchCurrentPageExpenses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/expenses/${userId}?limit=${pagination.limit}&offset=${pagination.offset}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = response.json();
        result.then((value) => {
          setExpenses(value);
        });
      } catch (error) {
        console.error("Failed to fetch all expenses:", error);
      }
    };

    fetchCurrentPageExpenses();
  }, [userId, pagination]);

  useEffect(() => {
    const fetchAllExpenses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/all-expenses/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNumberOfPages(Math.ceil(data.length / 10));
      } catch (error) {
        console.error("Failed to fetch all expenses:", error);
      }
    };

    fetchAllExpenses();
  }, [userId]);

  // Mutation to delete an expense
  const deleteExpenseMutation = useMutation(
    (expenseId) => deleteButton(expenseId),
    {
      onSuccess: () => {
        // Refetch expenses after a successful delete
        queryClient.invalidateQueries(["expenses", userId]);
      },
    }
  );

  const handleAlertStatus = (value) => {
    console.log("Alert status changed:", value);
    onStatusChange(value);
    //Part of React query code
    // // Refetch expenses when a new expense is added
    // queryClient.invalidateQueries(["expenses", userId]);
  };

  //Part of React query code
  // if (isLoading) {
  //   return <Typography>Loading expenses...</Typography>;
  // }

  // if (isError) {
  //   return <Typography>Error loading expenses.</Typography>;
  // }

  console.log("Total number of pages: " + numberOfPages);

  return (
    <Box sx={{ padding: 6, maxWidth: 500 }}>
      <Stack
        className="expense-list-stack"
        divider={<Divider sx={{ marginTop: 0 }} />}
      >
        <Card variant="outlined">
          <Typography
            className="expense-list-header"
            variant="h6"
            component="p"
          >
            Expenses
            <AddExpenseModal
              userId={userId}
              onStatusChange={(value) => {
                handleAlertStatus(value);
                console.log(
                  "Alert status changed from AddExpenseModal:",
                  value
                );
              }}
            />
          </Typography>
          <Typography className="expense-list">
            <Stack
              className="expense-list-stack"
              spacing={2}
              divider={<Divider orientation="horizontal" flexItem />}
            >
              {expenses.length === 0 && (
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
              {expenses.map((expense) => (
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
                      onClick={() =>
                        deleteExpenseMutation.mutate(expense.expenseId)
                      }
                    >
                      <span>Delete</span>
                    </Button>
                  </Typography>
                </Typography>
              ))}
            </Stack>
          </Typography>
        </Card>
      </Stack>
      <Stack spacing={2} sx={{ display: "flex", direction: "row" }}>
        {pagination.currentPage > 1 && (
          <Button
            className="PaginationPrevButton"
            sx={{ width: "20px" }}
            onClick={() => {
              const prevOffset = pagination.offset - 10;
              const prevPage = pagination.currentPage - 1;
              setPagination({
                ...pagination,
                offset: prevOffset,
                currentPage: prevPage,
              });
              console.log("previous");
            }}
          >
            Prev
          </Button>
        )}
        <span>{pagination.currentPage}</span>
        {pagination.currentPage < numberOfPages && (
          <Button
            className="PaginationNextButton"
            sx={{ width: "20px" }}
            onClick={() => {
              const nextOffset = pagination.offset + 10;
              const nextPage = pagination.currentPage + 1;
              setPagination({
                ...pagination,
                offset: nextOffset,
                currentPage: nextPage,
              });
              console.log(pagination);
            }}
          >
            Next
          </Button>
        )}
      </Stack>
      {/* <Stack spacing={2}>
        //Figure Out how this pagination can go backwards and change screen to
        reflect new set of expenses.
        <Pagination
          sx={{ display: "flex", justifyContent: "center" }}
          count={numberOfPages}
          size="large"
          onClick={() => {
            const prevButton = document.getElementsByClassName(
              ". MuiPaginationItem-previousNext"
            );
            console.log();
            pagination.currentPage;
            console.log("BEFORE: " + pagination.offset);
            let newOffset = (pagination.offset += 10);
            setPagination({
              ...pagination, // Copy the existing properties
              offset: newOffset, // Update the offset
            });
            console.log("AFTER: " + pagination.offset);
          }}
        />
      </Stack> */}
    </Box>
  );
}
