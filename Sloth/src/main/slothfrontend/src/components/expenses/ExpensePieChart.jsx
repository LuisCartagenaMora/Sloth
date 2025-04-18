import * as React from "react";
import { useState, useEffect } from "react";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

export default function ExpensePieChart({ userId }) {
  const [expenses, setExpenses] = useState([]);

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
        const result = response.json();
        result.then((value) => {
          setExpenses(value);
        });
      } catch (error) {
        console.error("Failed to fetch all expenses:", error);
      }
    };

    fetchAllExpenses();
  }, [userId]);

  const expensesAmount = expenses.map((expense) => {
    return expense.amount;
  });

  const expensesCategory = expenses.map((expense) => {
    return expense.category;
  });
  console.log(expenses);

  //Gets unique list of categories from current list of expenses
  let unique = [...new Set(expensesCategory)];
  console.log(unique);

  let totalAmountPerCategories = [];

  for (let i = 0; i < unique.length; i++) {
    let sum = 0;
    console.log("Checking " + unique[i]);
    for (let j = 0; j < expenses.length; j++) {
      if (unique[i] === expenses[j].category) {
        sum += expenses[j].amount;
        console.log(sum);
      }
    }
    totalAmountPerCategories.push(sum);
    console.log(totalAmountPerCategories);
  }

  return (
    <PieChart
      series={[
        {
          data: unique.map((_, index) => ({
            id: index,
            value: totalAmountPerCategories[index],
            label: unique[index],
          })),
        },
      ]}
      width={200}
      height={200}
    />
  );
}
