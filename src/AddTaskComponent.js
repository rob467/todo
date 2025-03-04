import {addTaskModal} from "./todo-form.js"
import { renderProjectComponent }  from "./ProjectsComponent.js"
import { renderMainProjectComponent, removeTaskOnCheck } from "./MainProjectViewComponent.js"
import { getInitialSidebarElements } from "./RenderSidebarComponent.js"
import { sharedProjectsFactory } from "./todoItems.js"

const sharedProjects = sharedProjectsFactory()
function taskComponent() {

    // Get initial elements and render project components
    const initialSidebar = getInitialSidebarElements();
    const addTaskButton = initialSidebar.addTaskBtn
    const projectComponent = renderProjectComponent();
    projectComponent.renderProjectsList();
    const renderMainProjects = renderMainProjectComponent();
    renderMainProjects.getProjectCards();

    // function handleSubmitTask(event) {
    //     event.preventDefault();
    //     const taskForm = document.querySelector(".todo-form");
    //     const taskTitle = document.querySelector("#title");
    //     const dueDate = document.querySelector("#due-date");
    //     const projectSelection = document.querySelector("#project-select");
    //     const priority = document.querySelector("input[name='priority']:checked");
    //     const description = document.querySelector("#task-description");

    //     sharedProjects.getAllProjects().forEach(project => {
    //         if (project.name === projectSelection.value) {
    //             project.addTodo(taskTitle.value, dueDate.value, priority.value, description.value)
    //     }})
    //     renderMainProjects.getProjectCards();
    //     projectComponent.renderProjectsList();
    //     taskForm.reset();
    //     removeTaskOnCheck();
    //     formElements.addTodoDialog.close();
    //     dueDate.valueAsDate = new Date();
    // }

    // addTaskButton.addEventListener("click", () => formElements.addTodoDialog.showModal())
    // formElements.cancelTaskBtn.addEventListener("click", () => formElements.addTodoDialog.close())
    // formElements.addTaskForm.addEventListener("submit", handleSubmitTask)
    }

export default taskComponent
