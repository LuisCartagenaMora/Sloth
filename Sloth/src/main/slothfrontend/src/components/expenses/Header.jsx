import * as React from "react";
import { Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HeaderCard() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate
  //Helps return the current user to their list of expenses
  let userId = Number(localStorage.getItem("userId"));

  return (
    <Grid
      container
      spacing={0}
      sx={{
        height: 100,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "baseline",
        textAlign: "center",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: "rgb(25, 118, 210)",
      }}
    >
      <Grid size={6} sx={{ textAlign: "start", pl: 3 }}>
        <Typography variant="h4" component="p">
          Sloth Expenses
        </Typography>
      </Grid>
      <Grid size={2}>
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            navigate("/about");
          }}
        >
          <Typography variant="h5" component="p">
            About
          </Typography>
        </Button>
      </Grid>
      <Grid size={2}>
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            navigate("/expenses/" + userId);
          }}
        >
          <Typography variant="h5" component="p">
            Expenses
          </Typography>
        </Button>
      </Grid>
      <Grid size={2}>
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            navigate("/home");
          }}
        >
          <Typography variant="h5" component="p">
            Logout
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
