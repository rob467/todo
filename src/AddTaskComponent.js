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

function getFormElements () {
    const addTodoDialog = addTodoForm.getFormDialog();
    const submitTaskBtn = addTodoForm.getSubmitTaskBtn();
    const cancelTaskBtn = addTodoForm.getCancelTaskBtn();
    return { addTodoDialog, submitTaskBtn, cancelTaskBtn }
}

const formElements = getFormElements()
const addTaskButton = createAddTaskButton()

function handleSubmitTask() {
    const taskTitle = document.querySelector("#title");
    console.log(taskTitle.value);
    formElements.addTodoDialog.close();
}

addTaskButton.addEventListener("click", () => formElements.addTodoDialog.showModal())
formElements.cancelTaskBtn.addEventListener("click", () => formElements.addTodoDialog.close())
formElements.submitTaskBtn.addEventListener("click", () => handleSubmitTask())

export { createAddTaskButton }
