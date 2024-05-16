document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const addExpenseToList = (expense, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
                          ${expense.name} - ₹${expense.amount}
                          <span>
                              <button class="btn btn-warning btn-sm edit-expense" data-index="${index}">Edit</button>
                              <button class="btn btn-danger btn-sm delete-expense" data-index="${index}">Delete</button>
                          </span>
                      `;
    expenseList.appendChild(li);
  };

  const updateLocalStorage = () => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  };

  const renderExpenses = () => {
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => addExpenseToList(expense, index));
  };

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("expense-name").value;
    const amount = document.getElementById("expense-amount").value;

    const newExpense = { name, amount };
    expenses.push(newExpense);
    updateLocalStorage();
    addExpenseToList(newExpense, expenses.length - 1);
    expenseForm.reset();
  });

  expenseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-expense")) {
      const index = e.target.getAttribute("data-index");
      expenses.splice(index, 1);
      updateLocalStorage();
      renderExpenses();
    } else if (e.target.classList.contains("edit-expense")) {
      const index = e.target.getAttribute("data-index");
      const expense = expenses[index];

      document.getElementById("expense-name").value = expense.name;
      document.getElementById("expense-amount").value = expense.amount;

      expenses.splice(index, 1);
      updateLocalStorage();
      renderExpenses();
    }
  });

  renderExpenses();
});
