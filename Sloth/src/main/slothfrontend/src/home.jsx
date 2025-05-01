import React from "react";
import RegisterCard from "./components/login/RegisterCard";
import LoginCard from "./components/login/LoginCard";
import SlothHome from "./components/login/HomeCard";
import About from "./about";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/diamond-upholstery.png)",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        py: 10,
      }}
    >
      <SlothHome />
      <RegisterCard />
      <LoginCard />
      <About />
    </Box>
  );
}
