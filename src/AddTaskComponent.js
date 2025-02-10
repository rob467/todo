import { createHtmlEl } from "./AddDOMComponents.js"
import createTodoItemForm from "./todo-form.js"
import addProjectsComponent  from "./ProjectsComponent.js"
import getProjectCards from "./MainProjectViewComponent.js"

function taskComponent() {
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
        const addTodoForm = createTodoItemForm()
        const addTodoDialog = addTodoForm.getFormDialog();
        const submitTaskBtn = addTodoForm.getSubmitTaskBtn();
        const addTaskForm = addTodoForm.getToDoForm();
        const cancelTaskBtn = addTodoForm.getCancelTaskBtn();
        return { addTodoDialog, submitTaskBtn, cancelTaskBtn, addTaskForm }
    }

    const formElements = getFormElements()
    const addTaskButton = createAddTaskButton()
    const projectsList = addProjectsComponent()

    function handleSubmitTask(event) {
        event.preventDefault();
        const taskTitle = document.querySelector("#title");
        const projectSelection = document.querySelector("#project-select");
        const dueDate = document.querySelector("#due-date");
        const priority = document.querySelector("input[name='priority']:checked");
        projectsList.projects.forEach(project => {
            if (project.name === projectSelection.value) {
                project.addTodoItem(taskTitle.value, dueDate.value, priority.value)
        }})
        console.log(projectsList)
        getProjectCards();
        projectsList.renderProjectsList()
        formElements.addTodoDialog.close()
    }

    addTaskButton.addEventListener("click", () => formElements.addTodoDialog.showModal())
    formElements.cancelTaskBtn.addEventListener("click", () => formElements.addTodoDialog.close())
    formElements.addTaskForm.addEventListener("submit", handleSubmitTask)
    }

export default taskComponent
