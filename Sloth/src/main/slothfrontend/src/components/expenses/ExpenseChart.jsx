import * as React from "react";
import { useState, useEffect } from "react";
import { BarChart, PieChart } from "@mui/x-charts";

export default function ExpenseChart({ userId }) {
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
    return expense;
  });

  const expensesCategory = expenses.map((expense) => {
    return expense.category;
  });
  console.log(expenses);

  let unique = [...new Set(expensesCategory)];
  console.log(expensesAmount);

  return (
    // <BarChart
    //   xAxis={[
    //     {
    //       id: "barCategories",
    //       data: [...expensesCategory],
    //       scaleType: "band",
    //     },
    //   ]}
    //   series={[
    //     {
    //       data: [...expensesAmount],
    //     },
    //   ]}
    //   height={300}
    // />

    <PieChart
      series={[
        {
          data: expensesCategory.map((category, index) => ({
            id: unique[index],
            value: expensesAmount[index],
            label: unique[index],
          })),
        },
      ]}
      width={200}
      height={200}
    />
  );
}
