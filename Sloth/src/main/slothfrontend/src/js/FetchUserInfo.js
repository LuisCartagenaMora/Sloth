import userCredentials from "./UserCredentials";

export default async function fetchUserInfoById(userId) {
  const token = sessionStorage.getItem("token");
  console.log("TOKEN: " + token);
  console.log(userId);
  const result = await fetch(`http://localhost:8081/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!result.ok) {
    console.error(`Failed to fetch user info: ${result.status}`);
    return null;
  }

  const data = await result.json();
  return data;
}
