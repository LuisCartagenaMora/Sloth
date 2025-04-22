import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import Calendar from "react-calendar";

export default function ChartsCard({ userId }) {
  const [expenses, setExpenses] = useState([]);
  const [sumPerMonth, setSumPerMonth] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    Aug: 0,
    June: 0,
    July: 0,
    Sept: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });

  // Fetch all expenses when the component mounts or userId changes
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
        setExpenses(data);
      } catch (error) {
        console.error("Failed to fetch all expenses:", error);
      }
    };

    fetchAllExpenses();
  }, [userId]);

  // Calculate total expenditure per month whenever expenses change
  useEffect(() => {
    const calculateSumPerMonth = () => {
      const newSumPerMonth = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        June: 0,
        July: 0,
        Aug: 0,
        Sept: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      };

      //This object is used to get the month from a number value and obtain its letter value (e.g. '04' => April)
      //This can be scrapped to just use the number equivalent of the month, but makes the logic readable throughout the process.
      const matchDate = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "Aug",
        "09": "Sept",
        10: "Oct",
        11: "Nov",
        12: "Dec",
      };

      expenses.forEach((expense) => {
        const month = matchDate[expense.date.slice(5, 7)];
        if (month) {
          newSumPerMonth[month] += expense.amount;
        }
      });

      setSumPerMonth(newSumPerMonth);
    };

    calculateSumPerMonth();
  }, [expenses]);

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

  //

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Prepare data for the BarChart
  const chartData = months.map((month) => ({
    month,
    total: sumPerMonth[month],
  }));
  //

  return (
    <Box sx={{ width: 500 }}>
      <Calendar
        onChange={(value) => {
          console.log(value);
        }}
      />
      {expenses.length > 0 && (
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
      )}
      {expenses.length > 0 && (
        <>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: chartData.map((data) => data.month),
              },
            ]}
            series={[
              {
                data: chartData.map((data) => data.total),
              },
            ]}
            height={200}
            width={500}
          />
        </>
      )}
    </Box>
  );
}
