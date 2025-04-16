import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../../login";
import Registration from "./../../register";
import Expenses from "./../../expenses";
import AboutPage from "./../../about";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/expenses/:userId" element={<Expenses />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* {routeIndex === 0 && <Route path="/expenses" element={<Expenses />} />}
        {routeIndex === 1 && <Route path="/about" element={<AboutPage />} />}
        {routeIndex === 2 && <Route path="/register" element={<Register />} />} */}
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppRouter />);
