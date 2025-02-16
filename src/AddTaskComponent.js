import { createHtmlEl } from "./AddDOMComponents.js"
import createTodoItemForm from "./todo-form.js"
import { addProjectsComponent }  from "./ProjectsComponent.js"
import { renderMainProjectComponent, removeTaskOnCheck } from "./MainProjectViewComponent.js"
import { getInitialSidebarElements } from "./RenderSidebarComponent.js"
import { sharedProjectsFactory } from "./todoItems.js"

const sharedProjects = sharedProjectsFactory()
function taskComponent() {

    function getFormElements () {
        const addTodoForm = createTodoItemForm()
        const addTodoDialog = addTodoForm.getFormDialog();
        const submitTaskBtn = addTodoForm.getSubmitTaskBtn();
        const addTaskForm = addTodoForm.getToDoForm();
        const cancelTaskBtn = addTodoForm.getCancelTaskBtn();
        return { addTodoDialog, submitTaskBtn, cancelTaskBtn, addTaskForm }
    }

    const initialSidebar = getInitialSidebarElements();
    const formElements = getFormElements()
    const addTaskButton = initialSidebar.addTaskBtn
    const projectComponent = addProjectsComponent()
    projectComponent.renderProjectsList()
    const renderMainProjects = renderMainProjectComponent();
    renderMainProjects.getProjectCards()

    function handleSubmitTask(event) {
        event.preventDefault();
        const taskTitle = document.querySelector("#title");
        const projectSelection = document.querySelector("#project-select");
        const dueDate = document.querySelector("#due-date");
        const priority = document.querySelector("input[name='priority']:checked");
        sharedProjects.getAllProjects().forEach(project => {
            if (project.name === projectSelection.value) {
                project.addTodo(taskTitle.value, dueDate.value, priority.value)
        }})
        renderMainProjects.getProjectCards();
        projectComponent.renderProjectsList();
        console.log(sharedProjects.getAllProjects())
        removeTaskOnCheck();
        formElements.addTodoDialog.close();
    }

    addTaskButton.addEventListener("click", () => formElements.addTodoDialog.showModal())
    formElements.cancelTaskBtn.addEventListener("click", () => formElements.addTodoDialog.close())
    formElements.addTaskForm.addEventListener("submit", handleSubmitTask)
    }

export default taskComponent
