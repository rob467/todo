import { TodoItem, Project } from "./todoItems.js"
import createTodoItemForm from "./todo-form.js"
import { createAddTaskButton } from "./AddTaskComponent.js"
import projectsSidebarElement from "./ProjectsComponent.js"
import "./styles.css"
import "./reset-styles.css"

const items = new Project("blah");
console.log(items.getItems());