const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");

const addTransactionBtn = document.querySelector(".add-transaction");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteBtn = document.querySelector(".delete");
const deleteAllBtn = document.querySelector(".delete-all");

const lightBtn = document.querySelector(".light");
const darkBtn = document.querySelector(".dark");

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];
let sum = 0;

const showPanel = () => {
  addTransactionPanel.style.display = "flex";
};
const closePanel = () => {
  addTransactionPanel.style.display = "none";
  clearInputs();
};

const checkForm = () => {
  if (
    nameInput.value != "" &&
    amountInput.value != "" &&
    categorySelect.value != "none"
  ) {
    createNewTransaction();
    closePanel();
    clearInputs();
  } else {
    alert("Uzupełnij wszystkie pola!");
  }
};

const clearInputs = () => {
  nameInput.value = "";
  amountInput.value = "";
  categorySelect.selectedIndex = "0";
};

const createNewTransaction = () => {
  const newTrasaction = document.createElement("div");
  newTrasaction.classList.add("transaction");
  newTrasaction.setAttribute("id", ID);

  newTrasaction.innerHTML = `
    <p class="transaction-name">${nameInput.value} ${categoryIcon} ${selectedCategory}</p>
    <p class="transaction-amount">${amountInput.value}zł <button class="delete" onclick = "deleteTransaction(${ID})"><i
    class="fas fa-times"></i></button></p>
    `;
  if (parseFloat(amountInput.value) > 0)
    incomeSection.appendChild(newTrasaction);
  else {
    expensesSection.appendChild(newTrasaction);
  }

  calculateAddTrans(ID);
  ID++;
};

const selectCategory = () => {
  selectedCategory =
    categorySelect.options[categorySelect.selectedIndex].textContent;

  if (selectedCategory == "[ + ] Przychód") {
    categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
  } else if (selectedCategory == "[ - ] Zakupy") {
    categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
  } else if (selectedCategory == "[ - ] Jedzenie") {
    categoryIcon = '<i class="fas fa-hamburger"></i>';
  } else {
    categoryIcon = '<i class="fas fa-film"></i>';
  }
};

const deleteTransaction = (id) => {
  const transactionToDelete = document.getElementById(`${id}`);
  const removeArea = transactionToDelete.closest(".area");
  removeArea.removeChild(transactionToDelete);

  moneyArr[id] = parseInt(0);
  calcuateDeleteTrans();
};

const deleteAll = () => {
  incomeSection.innerHTML = "<h3>Przychód:</h3>";
  expensesSection.innerHTML = "<h3>Wydatki:</h3>";
  ID = 0;
  moneyArr.length = 0;
  sum = 0;
  availableMoney.innerHTML = `${sum}zł`;
};

const calcuateDeleteTrans = () => {
  sum = 0;
  for (const el of moneyArr) {
    sum += parseInt(el);
  }
  availableMoney.innerHTML = `${sum}zł`;
};

const calculateAddTrans = (id) => {
  sum = 0;
  moneyArr[id] = amountInput.value;
  moneyArr.forEach((e) => {
    sum += parseInt(e);
  });
  availableMoney.innerHTML = `${sum}zł`;
};

const loadLightTheme = () => {
  root.style.setProperty("--first-color", "#F9F9F9");
  root.style.setProperty("--second-color", "#14161F");
  root.style.setProperty("--border-color", "#00000033");
};
const loadDarkTheme = () => {
  root.style.setProperty("--first-color", "#14161F");
  root.style.setProperty("--second-color", "#F9F9F9");
  root.style.setProperty("--border-color", "#F9F9F9");
};

addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", checkForm);
deleteAllBtn.addEventListener("click", deleteAll);
lightBtn.addEventListener("click", loadLightTheme);
darkBtn.addEventListener("click", loadDarkTheme);
