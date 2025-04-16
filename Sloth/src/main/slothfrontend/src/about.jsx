import React from "react";
import ReactDOM from "react-dom/client";
import About from "../src/components/about/About";
import Header from "./components/expenses/Header.jsx";

export default function AboutPage() {
  return (
    <React.StrictMode>
      <Header />
      <About />
    </React.StrictMode>
  );
}
