import { TodoItem, TodoList } from "./todolist.js";

export class Command{
    name;
    args;
    constructor(name, args){
        this.name = name;
        this.args = args;
    }
}

export const Commands = {
    ADD: "add", 
    DELETE: "delete",
}

export const commandExec = {
    execute(command){
        const todoList = TodoList.getInstance();
        switch(command.name){
            case Commands.ADD:
                const todoInput = globalThis.DOM.todoInput;
                const todoText = todoInput.value.trim();
                const todoExist = todoList.find(todoText);
                if(todoExist == undefined && todoText != ""){
                    todoList.add(new TodoItem(todoText));
                    todoInput.value = "";
                }
                break;
            case Commands.DELETE:
                break;
            
        }
    }
}