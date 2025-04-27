import React, { useState, useEffect, useContext } from "react";
import { Box, Button } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ExpenseContext from "./ExpenseContext";

export default function ChartsCard({ userId }) {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  //copyList- holds a copy pf the original expense list.
  const [copyList, setCopyList] = useState([]);
  //filteredExpenses- holds the expense list where the filters are being applied.
  const [filteredExpenses, setFilteredExpenses] = useState([]);
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

  // useEffect(() => {
  //   const fetchAllExpenses = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8081/all-expenses/${userId}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setExpenses(data);
  //     } catch (error) {
  //       console.error("Failed to fetch all expenses:", error);
  //     }
  //   };

  //   fetchAllExpenses();
  // }, [userId]);

  useEffect(() => {
    setFilteredExpenses(expenses);
    //Will only ever initialize the copyList once when it's empty.
    if (copyList.length === 0) {
      setCopyList(expenses);
    }
  }, [expenses]);

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

      filteredExpenses.forEach((expense) => {
        const month = matchDate[expense.date.slice(0, 2)];
        if (month) {
          newSumPerMonth[month] += expense.amount;
        }
      });

      setSumPerMonth(newSumPerMonth);
    };

    calculateSumPerMonth();
  }, [filteredExpenses]);

  const expensesCategory = filteredExpenses.map((expense) => {
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
    for (let j = 0; j < filteredExpenses.length; j++) {
      if (unique[i] === filteredExpenses[j].category) {
        sum += filteredExpenses[j].amount;
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

  const filterDate = (month) => {
    return copyList.filter((expense) => {
      //Gets the month (e.g. 04 -> March) from the expense
      let expensesMonth = expense.date.slice(0, 2);
      if (expensesMonth == month) {
        return expense.date;
      }
    });
  };

  return (
    <Box sx={{ width: 500 }}>
      <Button
        onClick={() => {
          setExpenses(copyList);
        }}
      >
        Reset
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          views={["month"]}
          openTo="month"
          onChange={(value) => {
            //Adding 1 corrects the order of months (e.g. 0 to 1 => January... 12 => December)
            const result = filterDate(value.$M + 1);
            setExpenses(result);
          }}
        />
      </LocalizationProvider>
      {filteredExpenses.length > 0 && (
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
      {filteredExpenses.length > 0 && (
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
