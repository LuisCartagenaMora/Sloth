import React, { useState, useEffect, createContext } from "react";
import { Box, Grid } from "@mui/material";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import "@material/top-app-bar/dist/mdc.top-app-bar.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import "@material/ripple/dist/mdc.ripple.css"; // optional but usually needed
import Header from "./components/expenses/Header.jsx";
import UserGreetingCard from "./components/expenses/UserGreetingCard.jsx";
import ExpenseList from "./components/expenses/ExpenseList.jsx";
import ExpenseAlert from "./components/expenses/ExpenseAlert.jsx";
import ChartsCard from "./components/expenses/ChartsCard.jsx";
import ExpenseContext from "./components/expenses/ExpenseContext.jsx";
import Calendar from "react-calendar";

export default function Expenses() {
  const [alertStatus, setAlertStatus] = React.useState(null);
  const { userId } = useParams();
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
        const data = await response.json();
        setExpenses(data);
      } catch (error) {}
    };

    fetchAllExpenses();
  }, [userId]);

  const handleAlertStatus = (value) => {
    setAlertStatus(value);
  };

  setTimeout(() => {
    setAlertStatus(null);
  }, 5000);

  return (
    <Box
    // sx={{
    //   backgroundImage:
    //     "url(https://www.transparenttextures.com/patterns/diamond-upholstery.png)",
    //   backgroundSize: "cover",
    //   backgroundRepeat: "repeat",
    //   py: 10,
    // }}
    >
      <Header />
      <UserGreetingCard userId={userId} />
      <ExpenseAlert alertStatus={alertStatus} />
      <ExpenseContext.Provider value={{ expenses, setExpenses }}>
        <Box sx={{ padding: 3 }}>
          <Grid container spacing={1}>
            {/* ExpenseList */}
            <Grid item xs={12} md={6}>
              <ExpenseList onStatusChange={handleAlertStatus} userId={userId} />
            </Grid>

            {/* ChartsCard */}
            <Grid item xs={12} md={6}>
              <ChartsCard userId={userId} />
            </Grid>
          </Grid>
        </Box>
      </ExpenseContext.Provider>

      {/* <ExpensePieChartPieChart userId={userId} />
      <ExpenseLineChart userId={userId} /> */}
    </Box>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Expenses />);
