const login = document.querySelector(".login");
const loginForm = login.querySelector("form");
const user = document.querySelector(".user");
const USERNAME_KEY = "username";
const TODO_KEY = "todos";
const logout = document.getElementById("logout");

const todo = document.querySelector(".todo");
const todoForm = todo.querySelector("form");
const todoList = document.querySelector(".todoList");
let savedTodos = [];

const authenticate = () => {
  const userName = localStorage.getItem(USERNAME_KEY);
  if (userName) {
    user.querySelector("#userName").innerText = `Hi, ${userName}`;
    login.hidden = true;
    user.hidden = false;
    // show todos only when logged in
    const storedTodos = localStorage.getItem(TODO_KEY);
    savedTodos = JSON.parse(storedTodos) || savedTodos;
    todo.hidden = false;
    showTodo();
  } else {
    login.hidden = false;
    user.hidden = true;
    todo.hidden = true;
    clearTodos();
  }
};

const addTodo = (val) => {
  const item = document.createElement("li");
  item.innerText = val.memo;
  const deleteButton = document.createElement("button");
  const icon = document.createElement("i");
  icon.classList.add(...["bi", "bi-trash", "trashIcon"]);
  deleteButton.appendChild(icon);
  // deleteButton.innerText = "-";
  deleteButton.id = val.id;
  deleteButton.addEventListener("click", handleDeleteClick);
  item.appendChild(deleteButton);
  todoList.appendChild(item);
};

const removeTodo = (id) => {
  const li = document.getElementById(id).parentNode;
  li.remove();
};

const showTodo = () => {
  savedTodos.forEach((eachTodo) => {
    addTodo(eachTodo);
  });
};

const clearTodos = () => {
  todoList.innerHTML = "";
};

const handleLoginSubmit = (e) => {
  e.preventDefault();
  const name = loginForm.querySelector("input");
  const val = name.value;
  localStorage.setItem(USERNAME_KEY, val);
  name.value = "";
  authenticate();
};

const handleTodoSubmit = (e) => {
  e.preventDefault();
  const todoInput = todoForm.querySelector("input");
  const val = { id: String(Date.now()), memo: todoInput.value };
  addTodo(val);
  savedTodos.push(val);
  localStorage.setItem(TODO_KEY, JSON.stringify(savedTodos));
  todoInput.value = "";
};

const handleLogoutClick = () => {
  localStorage.removeItem(USERNAME_KEY);
  authenticate();
};

const handleDeleteClick = (e) => {
  const id = e.target.id;
  const newTodos = savedTodos.filter((item) => item.id !== id);
  savedTodos = newTodos;
  localStorage.setItem(TODO_KEY, JSON.stringify(savedTodos));
  removeTodo(id);
};

loginForm.addEventListener("submit", handleLoginSubmit);
authenticate();
todoForm.addEventListener("submit", handleTodoSubmit);
logout.addEventListener("click", handleLogoutClick);
