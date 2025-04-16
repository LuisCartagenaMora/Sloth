import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchUserInfoById from "../../js/FetchUserInfo";

function handleUserInfouserId(userId) {
  const result = fetchUserInfoById(userId);
  return result;
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

export default function App({ userId }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = handleUserInfouserId(userId);
    user.then((value) => {
      console.log(value);
      setCurrentUser(value);
    });
  }, [userId]);
  return (
    <div className="user-info">
      <Typography className="" variant="h3">
        Welcome, {currentUser.first_name + " " + currentUser.last_name}
      </Typography>
      {/* Change this later on to make use of useState() */}
      <Typography variant="h5">Budget: ${currentUser.budget} </Typography>
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
