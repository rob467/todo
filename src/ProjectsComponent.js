import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import { TodoItem, Project } from "./todoItems.js"

function addProjectDialog() {
    const mainDiv = document.querySelector(".main")
    const projectDialog = createHtmlEl({tag: "dialog", parent: mainDiv,
        props: {className: "form-container"}});
    const projectForm = createHtmlEl({tag: "form", parent: projectDialog,
        props: {className: "project-form", id: "add-project"},});

    const getProjectDialog = () => projectDialog
    const getProjectForm = () => projectForm

    createHtmlLabelInput({parent: projectForm, forLabel: "project-title", labelTextContent: "Project Title: ",
        required: true, id: "project-title", name: "project-title"})
        
    const getSubmitProjectBtn = () => createHtmlEl({
        tag: "button", parent: projectForm,
        props: {id: "submit-project-btn", type: "submit"}, textContent: "Add Project"})

    const getCancelTaskBtn = () => createHtmlEl({
        tag: "button", parent: projectForm,
        props: {id: "cancel-project-btn"}, textContent: "Cancel"})
    
    return { getProjectDialog, getProjectForm, getSubmitProjectBtn, getCancelTaskBtn }
}

function projectsSidebarElement() {
    const sidebarDiv = document.querySelector(".sidebar")
    const projectHeadingDiv = createHtmlEl({
        tag:"div", parent: sidebarDiv, props: {className: "projects-heading"}
    })
    const projectHeading = createHtmlEl({
        tag: "h2", parent: projectHeadingDiv, textContent: "Projects"
    })
    const projectDiv = createHtmlEl({
        tag:"div", parent: sidebarDiv, props: {className: "projects-sidebar"}
    })
    const addProjectsBtn = createHtmlEl({
        tag: "button", parent: projectHeadingDiv, props: {
            id: "add-project", type: "submit"},
        textContent: "+"
    })
    return { projectDiv, addProjectsBtn };
}

const projectDialog = addProjectDialog()


function getProjectsElements () {
    const addProjectsDialog = projectDialog.getProjectDialog();
    const submitProjBtn = projectDialog.getSubmitProjectBtn();
    const cancelProjBtn = projectDialog.getCancelTaskBtn();
    const projectForm = projectDialog.getProjectForm();
    return { addProjectsDialog, cancelProjBtn, projectForm }
}

const projectElements = getProjectsElements()
const projectSidebar = projectsSidebarElement()
const projects = [];

function handleSubmitProject(event) {
    event.preventDefault();
    const projTitle = document.querySelector("#project-title");
    let projTitleValue = projTitle.value

    const projExists = projects.some(project => project.name === projTitleValue)
    if (projExists) {
        console.log(projTitleValue);
        projTitle.setCustomValidity("Project already exists!");
        console.log(projTitleValue);
    } else {
        projTitle.setCustomValidity("");
        projects.push(new Project(projTitle.value));
        projTitle.value = ""
        projectElements.addProjectsDialog.close();
    }

    projTitle.reportValidity();
    projTitle.addEventListener("input", function(){
        this.setCustomValidity("");
    })
    renderProjectsList(projects)
}

projectSidebar.addProjectsBtn.addEventListener("click",
    () => projectElements.addProjectsDialog.showModal())
projectElements.cancelProjBtn.addEventListener("click",
    () => projectElements.addProjectsDialog.close())
projectElements.projectForm.addEventListener("submit", handleSubmitProject);

function renderProjectsList(projects) {
    const projectsListContainer = createHtmlEl({tag: "div", parent: projectSidebar.projectDiv})
    const projectsList = createHtmlEl({tag: "ul", parent: projectsListContainer})
    projects.forEach(project => createHtmlEl({
        tag: "li", parent: projectsList, textContent: project.name
    }))
    console.log(projects)
}

export default projectsSidebarElement