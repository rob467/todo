import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import { projectList } from "./todoItems.js"

function createTodoItemForm() {
    const projects = projectList();

    const mainDiv = document.querySelector(".main")
    const formDialog = createHtmlEl({tag: "dialog", parent: mainDiv, props: {className: "form-container"}});
    const formToDo = createHtmlEl({tag: "form", parent: formDialog, props: {className: "todo-form"},});

    const formFields = [
        {forLabel: "title", labelTextContent: "Title: ",
            required: true, id: "title", name: "title"},
        {forLabel: "due-date",labelTextContent: "Due Date: ",
            inputType: "date", required: true, id: "due-date", name: "due-date"}]

    formFields.forEach(field => createHtmlLabelInput({parent: formToDo, ...field}))

    const priorities = ["high", "medium", "low"]
    const prioritiesDiv = createHtmlEl({tag: "div", parent: formToDo});
    const projectsDiv = createHtmlEl({tag: "div", parent: formToDo});

    priorities.forEach(priority => createHtmlLabelInput({
        parent: prioritiesDiv, inputType: "radio", name: "priority",
        createDiv: false, forLabel: priority, id: priority, enterValue: true,
        labelTextContent: priority.charAt(0).toUpperCase() + priority.slice(1),
    }))

    const selectProjectLabel = createHtmlEl({
        tag: "label", parent: projectsDiv, textContent: "Project: "})
        selectProjectLabel.htmlFor = "project-select"
    const selectProjectElement = createHtmlEl({
        tag: "select", parent: projectsDiv, props: {id: "project-select", name: "projects"}})
    projects.getProjectList().toReversed().forEach(project => createHtmlEl({
        tag: "option", parent: selectProjectElement,
        props: {value: project.name},
        textContent: project.name
    }))
    
    const getFormDialog = () => formDialog
    const getToDoForm = () => formToDo

    const getSubmitTaskBtn = () => createHtmlEl({
        tag: "button", parent: formToDo,
        props: {id: "submit-btn", type: "submit"}, textContent: "Add Task"})

    const getCancelTaskBtn = () => createHtmlEl({
        tag: "button", parent: formToDo,
        props: {id: "cancel-btn"}, textContent: "Cancel"})

    return { getFormDialog, getToDoForm, getSubmitTaskBtn, getCancelTaskBtn }
    }

export default createTodoItemForm