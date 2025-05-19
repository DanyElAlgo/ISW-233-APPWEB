import { Command, CommandExecutor, Commands } from "./services/command.js";
import { TodoList } from "./services/todolist.js";

globalThis.DOM = {};

function renderList() {
  const todoList = TodoList.getInstance();
  DOM.todoList.innerHTML = "";
  for (const todo of todoList.items) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `${todo.text} <button class="delete-btn">Delete</button>`;
    DOM.todoList.appendChild(todoItem);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  DOM.todoInput = document.getElementById("todo-input");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoList = document.getElementById("todo-list");

  DOM.addBtn.addEventListener("click", () => {
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  });

  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
    }
  });

  TodoList.getInstance().addObserver(renderList);
});
