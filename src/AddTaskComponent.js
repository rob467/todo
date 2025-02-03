import { createHtmlEl } from "./AddDOMComponents.js"
import createTodoItemForm from "./todo-form.js"
import { TodoItem, Project } from "./todoItems.js"

const addTodoForm = createTodoItemForm()

function createAddTaskButton() {
    const sidebarDiv = document.querySelector(".sidebar");
    const addTaskButton = createHtmlEl({
        tag: "button",
        parent: sidebarDiv,
        textContent: "Add Task"
    })
    return addTaskButton
}
const addTodoDialog = addTodoForm.getFormDialog();
const submitTaskBtn = addTodoForm.getSubmitTaskBtn();
const cancelTaskBtn = addTodoForm.getCancelTaskBtn();
const addTaskButton = createAddTaskButton()

function handleSubmitTask() {
    const taskTitle = document.querySelector("#title");
    console.log(taskTitle.value);
    addTodoDialog.close();
}

addTaskButton.addEventListener("click", () => addTodoDialog.showModal())
cancelTaskBtn.addEventListener("click", () => addTodoDialog.close())
submitTaskBtn.addEventListener("click", () => handleSubmitTask())

export { createAddTaskButton }
