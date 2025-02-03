import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import { TodoItem, Project } from "./todoItems.js"

const projects = [];

function addProjectDialog() {
    const mainDiv = document.querySelector(".main")
    const projectDialog = createHtmlEl({tag: "dialog", parent: mainDiv, props: {className: "form-container"}});
    const formProject = createHtmlEl({tag: "form", parent: projectDialog, props: {className: "project-form"},});

    const getProjectDialog = () => projectDialog

    createHtmlLabelInput({parent: formProject, forLabel: "project-title", labelTextContent: "Project Title: ",
        required: true, id: "project-title", name: "project-title"})
        
    const getSubmitProjectBtn = () => createHtmlEl({
        tag: "button", parent: formProject,
        props: {id: "submit-project-btn", type: "button"}, textContent: "Add Project"})

    const getCancelTaskBtn = () => createHtmlEl({
        tag: "button", parent: formProject,
        props: {id: "cancel-project-btn"}, textContent: "Cancel"})
    
    return { getProjectDialog, getSubmitProjectBtn, getCancelTaskBtn }
}

function projectsSidebarElement() {
    const sidebarDiv = document.querySelector(".sidebar")
    const projectDiv = createHtmlEl({
        tag:"div", parent: sidebarDiv, props: {className: "projects-sidebar"}
    })
    const projectHeading = createHtmlEl({
        tag: "h2", parent: projectDiv, textContent: "Projects"
    })
    const addProjectsBtn = createHtmlEl({
        tag: "button", parent: projectDiv, props: {
            id: "add-project", type: "button"},
        textContent: "+"
    })
    return { projectDiv, addProjectsBtn };
}

const projectDialog = addProjectDialog()

function getProjectsElements () {
    const addProjectsDialog = projectDialog.getProjectDialog();
    const submitProjBtn = projectDialog.getSubmitProjectBtn();
    const cancelProjBtn = projectDialog.getCancelTaskBtn();
    return { addProjectsDialog, submitProjBtn, cancelProjBtn }
}

const projectElements = getProjectsElements()
const projectSidebar = projectsSidebarElement()

function handleSubmitProject() {
    const projTitle = document.querySelector("#project-title");
    projects.push(new Project(projTitle.value));
    console.log(projects);
    projectElements.addProjectsDialog.close();
}

projectSidebar.addProjectsBtn.addEventListener("click", () => projectElements.addProjectsDialog.showModal())
projectElements.cancelProjBtn.addEventListener("click", () => projectSidebar.addTodoDialog.close())
projectElements.submitProjBtn.addEventListener("click", () => handleSubmitProject())

export default projectsSidebarElement