import * as React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import createUser from "../../js/CreateUserButton";
import { useNavigate } from "react-router-dom";

//Text box that allows a user to enter their:
// 1. First Name
// 2. Last Name
// 3. Email
// 4. Password
function handleClick() {
  console.log("Attempted to create a new user");
}

function handleRoute() {
  console.log("Attempted to create a new user");
}

export default function RegisterCard() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  // const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(firstName, lastName, userName, password);
    const response = createUser(firstName, lastName, userName, password);
    response.then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <Container
        sx={{
          display: "grid",
          alignContent: "center",
          justifyItems: "center",
          width: 1 / 4,
          border: "1px solid grey",
          boxShadow: "10px 10px 5px lightblue;",
        }}
        // sx={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   width: [1 / 8],
        //   border: "1px solid grey",
        //   boxShadow: "10px 10px 5px lightblue;",
        // }}
      >
        <Typography variant="h4">Register</Typography>
        <Box>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            <TextField
              label={"First Name"}
              sx={{ p: 1 }}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></TextField>
            <TextField
              label={"Last Name"}
              sx={{ p: 1 }}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            ></TextField>
            {/* <TextField
              label={"Email"}
              sx={{ p: 1 }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></TextField> */}
            <TextField
              label={"Username"}
              sx={{ p: 1 }}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></TextField>
            <TextField
              label={"Password"}
              sx={{ p: 1 }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></TextField>
          </Typography>
        </Box>
        <Button
          onClick={handleClick}
          sx={{
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <span>Create</span>
        </Button>
      </Container>
    </>
  );
}
