import { TodoItem, Project } from "./todoItems.js"
import createTodoItemForm from "./todo-form.js"
import { createAddTaskButton } from "./AddTaskComponent.js"
import "./styles.css"
import "./reset-styles.css"

const items = new Project("blah");
createTodoItemForm();
console.log(items.getItems());