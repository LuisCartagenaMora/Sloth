import * as React from "react";

export default function getAllExpenses() {
  const [expenses, setExpenses] = React.useState([]);
  React.useEffect(() => {
    async function fetchExpensesByUserId(userId) {
      try {
        const response = await fetch(
          "http://localhost:8081/expenses/" + userId,
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
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }
  }, []);
  return expenses;
}
