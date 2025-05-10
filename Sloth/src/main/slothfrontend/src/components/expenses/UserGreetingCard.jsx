import { Button, Typography, Icon, Modal, Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchUserInfoById from "../../js/FetchUserInfo";

function handleUserInfouserId(userId) {
  const result = fetchUserInfoById(userId);
  return result;
}

async function handleBudget(userId, newBudget) {
  const response = await fetch(
    "http://localhost:8081/add-budget?userId=" +
      userId +
      " &budget=" +
      newBudget,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.ok) {
    console.log("Successfully updated the current users budget");
  } else {
    console.log(
      "Budget could not be updated at this time. Please try again later."
    );
  }
}

async function fetchUserById(userId) {
  const response = await fetch(`http://localhost:8081/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export default function UserGreetingCard({ userId }) {
  // const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // const [budget, setBudget] = useState("");

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  useEffect(() => {
    const user = handleUserInfouserId(userId);
    user.then((value) => {
      console.log(value);
      setCurrentUser(value);
    });
  }, [userId]);
  return (
    <div className="user-info">
      {/* Prevents "Welcome, undefined undefined" from being displayed before the names are loaded. */}
      {currentUser.first_name && currentUser.last_name !== undefined && (
        <>
          <Typography className="" variant="h3">
            Welcome, {currentUser.first_name + " " + currentUser.last_name}
          </Typography>
        </>
      )}

      {/* Add again for budget functionality */}
      {/* <Typography variant="h5">Budget: ${currentUser.budget} </Typography>
      <Button
        variant="transparent"
        onClick={() => {
          handleOpen();
        }}
      >
        <Icon fontSize="large">add_circle</Icon>
        <span>Add Budget</span>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            border: 1,
            m: { xs: 15, sm: 25, md: 45, lg: 45, xl: 55 },
            height: { xs: 15, sm: 25, md: 200, lg: 45, xl: 55 },
            width: { xs: 15, sm: 25, md: 300, lg: 45, xl: 55 },
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update your current budget
          </Typography>
          <div className="modal-text-field-box" sx={{ m: 1, width: "25ch" }}>
            <TextField
              className="modal-text-field"
              required
              id="filled-required"
              label="Budget"
              variant="filled"
              onChange={(e) => {
                setBudget(e.target.value);
              }}
            />
          </div>
          <Button
            color="primary"
            onClick={() => {
              handleBudget(currentUser.userId, budget);
              setOpen(false);
            }}
          >
            Update
          </Button>
        </Box>
      </Modal> */}
    </div>
  );
}

// export default function App({ userId }) {
//   // console.log(userId);
//   // const user = handleUserInfouserId(userId);
//   // console.log(user);
//   // setCurrentUser(user);
//   // Fetch expenses using React Query
//   const {
//     data: user = {},
//     isLoading,
//     isError,
//   } = useQuery(["user", userId], async () => {
//     const response = await fetch(`http://localhost:8081/user/${userId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   });

//   if (isLoading) return <Typography>Fetching user info...</Typography>;
//   if (isError)
//     return <Typography>An error occurred: {isError.message}</Typography>;

//   return (
//     <div className="user-info">
//       <Typography className="" variant="h3">
//         Welcome, {user.first_name + " " + user.last_name}
//       </Typography>
//       {/* Change this later on to make use of useState() */}
//       <Typography variant="h5">Budget: ${user.budget} </Typography>
//     </div>
//   );
// }
