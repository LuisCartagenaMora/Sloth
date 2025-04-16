export default async function userVerification(username, passWord) {
  //fetch user with similar username, if one exists check if the password (encrypted) is similar to the entered password.
  //If true, redirect user to the expense screen.
  const url = "http://localhost:8081/v1/auth/authenticate";
  try {
    const response = await fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: passWord,
        }),
      },
      []
    );

    if (!response.ok) {
      return null;
    }

    response.json().then((value) => {
      sessionStorage.setItem("token", value.token);
    });

    const userDetails = await fetchVerifiedUser(username);
    if (userDetails !== null) {
      return userDetails;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
}

async function fetchVerifiedUser(username) {
  const url = "http://localhost:8081/get-user/" + username;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      []
    );

    const data = await response.json();
    console.log("Verified users id: " + data.userId);
    return data;
  } catch (e) {
    console.error(e);
  }
}
