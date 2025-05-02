import React from "react";
import ReactDOM from "react-dom/client";
import About from "../src/components/about/About";
import Header from "./components/expenses/Header.jsx";
import { Box } from "@mui/material";

export default function AboutPage() {
  return (
    <React.StrictMode>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          borderRadius: 5,
        }}
      >
        <About />
      </Box>
    </React.StrictMode>
  );
}
