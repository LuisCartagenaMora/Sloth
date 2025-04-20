import * as React from "react";
import { useState, useEffect } from "react";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

export default function ExpensePieChart({ userId }) {
  const [expenses, setExpenses] = useState([]);
  const [sumPerMonth, setSumPerMonth] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    Aug: 0,
    June: 0,
    July: 0,
    Aug: 0,
    Sept: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });

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

  //Gets unique list of categories from current list of expenses
  let unique = [...new Set(expensesCategory)];

  //Array which stores the total sum amount per expense category that is unique.
  let totalAmountPerCategories = [];

  //Iterates over the number of unique categories and for each category
  //sums up all of the available expense amounts from that category, before
  //continuing to the next category. (e.g. [Food[12, 45, 8, 21], Clothing[65, 105, 32]] = > [Food[86], Clothing[202]])
  for (let i = 0; i < unique.length; i++) {
    let sum = 0;
    // console.log("Checking " + unique[i]);
    for (let j = 0; j < expenses.length; j++) {
      if (unique[i] === expenses[j].category) {
        sum += expenses[j].amount;
      }
    }
    totalAmountPerCategories.push(sum);
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
