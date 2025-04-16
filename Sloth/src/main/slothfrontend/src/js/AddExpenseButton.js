export default async function createExpense(
  userId,
  date,
  amount,
  category,
  description
) {
  let state = false;
  try {
    const response = await fetch("http://localhost:8081/new-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        date: date,
        amount: amount,
        category: category,
        description: description,
      }),
    });

    if (response.ok) {
      console.log("Successfully created new expense.");
      state = true;
    } else {
      console.log("Could not create new expense.");
    }
  } catch (e) {
    console.error("An error occurred while creating a new expense.");
  }
  return state;
}
