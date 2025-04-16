export default async function deleteButton(expenseId) {
  const response = await fetch(
    "http://localhost:8081/delete-expense/" + expenseId,
    {
      method: "DELETE",
      body: expenseId,
    }
  );
  if (response.ok) {
    console.log("Successfully deleted expense# ${expenseId}");
  } else {
    console.log(
      "Expense# ${expenseId} could not be deleted! Please try again later."
    );
  }
}
