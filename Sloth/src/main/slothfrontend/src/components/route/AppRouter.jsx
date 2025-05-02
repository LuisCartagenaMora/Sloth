import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Expenses from "./../../expenses";
import AboutPage from "./../../about";
import Home from "./../../home";
import LoginPage from "../menu/LoginPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/expenses/:userId" element={<Expenses />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/register" element={<Registration />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        {/* {routeIndex === 0 && <Route path="/expenses" element={<Expenses />} />}
        {routeIndex === 1 && <Route path="/about" element={<AboutPage />} />}
        {routeIndex === 2 && <Route path="/register" element={<Register />} />} */}
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppRouter />);
