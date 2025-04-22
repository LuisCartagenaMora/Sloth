import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { BarChart } from "@mui/x-charts";

export default function ExpenseLineChart({ userId }) {
  const [expenses, setExpenses] = useState([]);
  const [sumPerMonth, setSumPerMonth] = useState({
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
  });

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

  // Prepare data for the BarChart
  const chartData = months.map((month) => ({
    month,
    total: sumPerMonth[month],
  }));

  return (
    expenses.length > 0 && (
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
    )
  );
}
