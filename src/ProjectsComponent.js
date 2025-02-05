import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import { TodoItem, Project, projectList } from "./todoItems.js"

function addProjectsComponent() {
    const projects = projectList();

    // Create project dialog window for adding projects
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

    // Renders project info in sidebar;
    function projectsSidebarElement() {
        const sidebarDiv = document.querySelector(".sidebar")
        const projectHeadingDiv = createHtmlEl({
            tag:"div", parent: sidebarDiv, props: {className: "projects-heading"}
        })
        const projectHeading = createHtmlEl({
            tag: "h2", parent: projectHeadingDiv, textContent: "Projects"
        })
        const addProjectsBtn = createHtmlEl({
            tag: "button", parent: projectHeadingDiv, props: {
                id: "add-project", type: "submit"},
            textContent: "+"
        })
        const projectListsDiv = createHtmlEl({
            tag:"div", parent: sidebarDiv, props: {className: "projects-sidebar"}
        })

        const projectsList = createHtmlEl({
            tag: "ul", parent: projectListsDiv,
        })
        return { projectListsDiv, addProjectsBtn, projectsList };
    }

    const projectDialog = addProjectDialog()

    const projectElements = (function getProjectsElements () {
        const addProjectsDialog = projectDialog.getProjectDialog();
        const submitProjBtn = projectDialog.getSubmitProjectBtn();
        const cancelProjBtn = projectDialog.getCancelTaskBtn();
        const projectForm = projectDialog.getProjectForm();
        return { addProjectsDialog, cancelProjBtn, projectForm }
    })()

    const projectSidebar = projectsSidebarElement()

    renderProjectsList();

    // Updates add task form to include new project options
    function updateAddTaskForm() {
        const selectProject = document.querySelector("#project-select")
        while (selectProject.firstChild) {
            selectProject.removeChild(selectProject.firstChild)
        }
        projects.getProjectList().toReversed().forEach(project => createHtmlEl({
            tag: "option", parent: selectProject,
            props: {value: project.name},
            textContent: project.name
        }))
    }

    function handleSubmitProject(event) {
        event.preventDefault();
        const projTitle = document.querySelector("#project-title");
        let projTitleValue = projTitle.value

        const projExists = projects.getProjectList().some(project => project.name === projTitleValue)
        if (projExists) {
            projTitle.setCustomValidity("Project already exists!");
        } else {
            projTitle.setCustomValidity("");
            projects.getProjectList().push(new Project(projTitle.value));
            updateAddTaskForm()
            projTitle.value = "";
            projectElements.addProjectsDialog.close();
            renderProjectsList();
        }

        projTitle.reportValidity();
        projTitle.addEventListener("input", function(){
            this.setCustomValidity("");
        })
    }

    projectSidebar.addProjectsBtn.addEventListener("click",
        () => projectElements.addProjectsDialog.showModal())
    projectElements.cancelProjBtn.addEventListener("click",
        () => projectElements.addProjectsDialog.close())
    projectElements.projectForm.addEventListener("submit", handleSubmitProject);

    function renderProjectsList() {
        while (projectSidebar.projectsList.firstChild) {
            projectSidebar.projectsList.removeChild(
                projectSidebar.projectsList.firstChild
            )
        }
        projects.getProjectList().toReversed().forEach(project => createHtmlEl({
            tag: "li", parent: projectSidebar.projectsList, textContent: project.name
        }))
    }
}

export default addProjectsComponent