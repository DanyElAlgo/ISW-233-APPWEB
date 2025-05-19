import { observerMixin } from "./mixin.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }
}

export class TodoList {
  #data = new Set();

  get items() {
    return this.#data;
  }

  static instance = null;
  static {
    this.instance = new TodoList();
  }

  constructor() {
    if (TodoList.instance) {
      console.log("NO MULTIPLE INSTANCES >:(");
    }
  }

  static getInstance() {
    return this.instance;
  }

  add(todoItem) {
    const array = Array.from(this.#data);
    const todoExists = array.filter((t) => t.text == todoItem.text).length > 1;
    if (!todoExists) {
      this.#data.add(todoItem);
      this.notify();
    }
  }
  remove(todoItem) {
    this.#data.forEach((e)=>{
        if(e.text == todoItem.text){
            this.#data.delete(e);
            this.notify();
            return;
        }
    })
    console.log("not found");
  }
  find(text) {
    const array = Array.from(this.#data);
    return array.find((t)=> t.text == text);
  }
}

Object.assign(TodoList.prototype, observerMixin);