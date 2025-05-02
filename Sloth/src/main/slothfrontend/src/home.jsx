import React from "react";
import SlothHome from "./components/menu/HomeCard";
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
      <About />
    </Box>
  );
}
