import { TodoItem, Project } from "./todoItems.js"
import createTodoItemForm from "./todo-form.js"

const items = new Project("blah");
items.addTodoItem("title", 2000, "low")
createTodoItemForm();
console.log(items.getItems());