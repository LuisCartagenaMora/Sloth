import * as React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import userVerification from "../../js/UserVerification";
import { useNavigate } from "react-router-dom";
import userCredentials from "../../js/UserCredentials";

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

export default function LoginCard() {
  // const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    // createUser(firstName, lastName, userName, password);
    // Verify users credendtials, if correct redirect to /expenses and display current users expenses.
    const userDetails = userVerification(userName, password);
    userDetails.then((user) => {
      const userDetails = userCredentials(user);
      localStorage.setItem("userId", userDetails.userId);
      userDetails === null
        ? console.log("Unable to login due to incorrect credentials.")
        : navigate("/expenses/" + userDetails.userId);
    });
    console.log("Verification of user credentials in process...");
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: { xs: 10, sm: 20, md: 30 }, // Adjust top margin for different screen sizes
          width: { xs: "60%", sm: "40%", md: "30%", lg: "20%", xlg: "5%" }, // Responsive width
          p: 2,
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
        <Typography variant="h4">
          <span>Login</span>
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          <span>Enter your credentials</span>
        </Typography>
        <Box>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 0,
            }}
          >
            {/* <TextField
              label={"Email"}
              sx={{ p: 1 }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></TextField> */}
            <TextField
              sx={{ mb: 2 }}
              label={"Username"}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></TextField>
            <TextField
              sx={{ mb: 2 }}
              label={"Password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></TextField>
          </Typography>
        </Box>
        <Button
          onClick={handleClick}
          sx={{
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
      </Container>
    </>
  );
}
