import { createHtmlEl, createHtmlLabelInput, removeAllChildren } from "./AddDOMComponents.js"
import { Project, projectList, sharedProjectsFactory } from "./todoItems.js"
import { renderMainProjectComponent, removeTaskOnCheck } from "./MainProjectViewComponent.js"

const sharedProjects = sharedProjectsFactory()

function createProjectDialog() {
    const mainDiv = document.querySelector(".main")
    const projectDialog = createHtmlEl({tag: "dialog", parent: mainDiv,
        props: {className: "form-dialog", id: "project-dialog"}});
    const projectForm = createHtmlEl({tag: "form", parent: projectDialog,
        props: {className: "project-form", id: "add-project"},});

    const getProjectDialog = () => projectDialog
    const getProjectForm = () => projectForm

    createHtmlLabelInput({
        parent: projectForm,
        forLabel: "project-title",
        labelTextContent: "Project Title: ",
        required: true, id: "project-title",
        name: "project-title"})
        
    createHtmlEl({
        tag: "button", parent: projectForm,
        props: {id: "submit-project-btn", type: "submit"},
        textContent: "Add Project"
    })

    createHtmlEl({
        tag: "button", parent: projectForm,
        props: {id: "cancel-project-btn", type: "button"},
        textContent: "Cancel"
    })
    
    return { getProjectDialog, getProjectForm }
}

createProjectDialog();

function addProjectsComponent() {

    const projectDialog = document.querySelector("#project-dialog")

    const projectElements = (function getProjectsElements () {
        const submitProjBtn = document.querySelector("#submit-project-btn")
        const cancelProjBtn = document.querySelector("#cancel-project-btn")
        const projectForm = document.querySelector(".project-form")
        return { cancelProjBtn, projectForm }
    })()

    // Updates add task form to include new project options
    function updateAddTaskForm() {
        const selectProject = document.querySelector("#project-select")
        while (selectProject.firstChild) {
            selectProject.removeChild(selectProject.firstChild)
        }
        sharedProjects.getAllProjects().toReversed().forEach(project => createHtmlEl({
            tag: "option", parent: selectProject,
            props: {value: project.name},
            textContent: project.name
        }))
    }

    function handleSubmitProject(event) {
        event.preventDefault();
        const projectForm = document.querySelector(".project-form");
        const projTitle = document.querySelector("#project-title");
        let projTitleValue = projTitle.value

        const projExists = sharedProjects.getAllProjects().some(project => project.name === projTitleValue)
        if (projExists) {
            projTitle.setCustomValidity("Project already exists!");
        } else {
            projTitle.setCustomValidity("");
            sharedProjects.addProject(projTitle.value);
            updateAddTaskForm();
            renderMainProjectComponent().getProjectCards();
            projectForm.reset();
            projectDialog.close();
            renderProjectComponent().renderProjectsList();
            removeTaskOnCheck();
        }

        projTitle.reportValidity();
        projTitle.addEventListener("input", function(){
            this.setCustomValidity("");
        })
    }

    const addProjectsBtn = document.querySelector("#add-project-btn")
    addProjectsBtn.addEventListener("click",
        () => projectDialog.showModal())
    projectElements.cancelProjBtn.addEventListener("click",
        () => projectDialog.close())
    projectElements.projectForm.addEventListener("submit", handleSubmitProject);
    }

function renderProjectComponent(){
    function renderProjectsList() {
        const projectSidebarList = document.querySelector(".projects-sidebar-list")
        removeAllChildren(projectSidebarList)

        sharedProjects.getAllProjects().toReversed().forEach(project => {

            const projectListElement = createHtmlEl({
            tag: "li", parent: projectSidebarList, 
            props: {"id": `id-${project.name.replace(/[^a-zA-Z0-9]/g, "-")}-li`},
            textContent: project.name
            })

            createHtmlEl({
            tag: "ul", parent: projectListElement,
            props: {
                id: `todo-list-${project.name.replace(/[^a-zA-Z0-9]/g, "-")}`,
                className: "project-task-lists"
            }})

        renderTaskList(project)
    })
    }
    
    function renderTaskList(project) {
        const projectListElement = document.querySelector(`#id-${project.name.replace(/[^a-zA-Z0-9]/g, "-")}-li`)
        const taskListElement = document.querySelector(`#todo-list-${project.name.replace(/[^a-zA-Z0-9]/g, "-")}`)
        removeAllChildren(taskListElement)
        
        project.getTodos().forEach(todoTask => {
            createHtmlEl({
            tag: "li", parent: taskListElement,
            textContent: todoTask.title
        })})
    }
    return { renderProjectsList, renderTaskList}
}

export { addProjectsComponent, renderProjectComponent }