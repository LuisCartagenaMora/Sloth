import React, { useState, useEffect, createContext } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router-dom";
import "@material/top-app-bar/dist/mdc.top-app-bar.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import "@material/ripple/dist/mdc.ripple.css"; // optional but usually needed
import Header from "./components/expenses/Header.jsx";
import App from "./components/expenses/App.jsx";
import ExpenseList from "./components/expenses/ExpenseList.jsx";
import ExpenseAlert from "./components/expenses/ExpenseAlert.jsx";
import ExpensePieChartPieChart from "./components/expenses/ExpensePieChart.jsx";
import ChartsCard from "./components/expenses/ChartsCard.jsx";
import ExpenseContext from "./components/expenses/ExpenseContext.jsx";
import ExpenseLineChart from "./components/expenses/ExpenseLineChart.jsx";
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
      } catch (error) {
        console.error("Failed to fetch all expenses:", error);
      }
    };

    fetchAllExpenses();
  }, [userId]);

  console.log(expenses);

  const handleAlertStatus = (value) => {
    setAlertStatus(value);
    console.log("Alert status changed:", value);
  };

  setTimeout(() => {
    setAlertStatus(null);
  }, 5000);

  return (
    <>
      <Header />
      <App userId={userId} />
      <ExpenseAlert alertStatus={alertStatus} />
      <ExpenseContext.Provider value={{ expenses, setExpenses }}>
        <ExpenseList onStatusChange={handleAlertStatus} userId={userId} />
        <ChartsCard userId={userId} />
      </ExpenseContext.Provider>

      {/* <ExpensePieChartPieChart userId={userId} />
      <ExpenseLineChart userId={userId} /> */}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Expenses />);
