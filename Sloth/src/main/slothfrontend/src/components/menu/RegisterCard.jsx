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
          mt: 30,
          alignContent: "center",
          justifyItems: "start",
          width: 1 / 4,
          padding: [0, 3],
          border: "1px solid grey",
          borderRadius: 5,
          // boxShadow: "10px 10px 5px lightblue;",
          backgroundColor: "whitesmoke",
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
        <Typography variant="h4" sx={{ pl: 1 }}>
          Registration
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ pl: 1, mb: 2 }}>
          Please register your information
        </Typography>
        <Box>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 0,
            }}
          >
            <TextField
              label={"First Name"}
              sx={{ p: 1, mb: 0.3 }}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></TextField>
            <TextField
              label={"Last Name"}
              sx={{ p: 1, mb: 0.3 }}
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
              sx={{ p: 1, mb: 0.3 }}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></TextField>
            <TextField
              label={"Password"}
              sx={{ p: 1, mb: 0.3 }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></TextField>
          </Typography>
        </Box>
        <Box
          id="abcd"
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: 5,
            width: 300,
          }}
        >
          <Button
            onClick={handleClick}
            sx={{
              mt: 1,
              width: 300,
              borderRadius: 5,
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            <span>Create</span>
          </Button>
        </Box>
      </Container>
    </>
  );
}
