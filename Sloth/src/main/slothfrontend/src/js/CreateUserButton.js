import * as React from "react";
import { redirect } from "react-router-dom";

export default async function createUser(
  firstName,
  lastName,
  userName,
  password
) {
  try {
    const response = await fetch("http://localhost:8081/new-user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: userName,
        password: password,
      }),
    });

    if (response.ok) {
      console.log("Successfully created new user.");
      redirect("/login");
    } else {
      console.log("Could not create new user.");
    }
  } catch (e) {
    console.error("An error occurred while creating a new user.");
  }
}
