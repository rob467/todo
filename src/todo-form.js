import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import { projectList, sharedProjectsFactory } from "./todoItems.js"

const sharedProjects = sharedProjectsFactory();

function createTodoItemForm() {

    const mainDiv = document.querySelector(".main")
    const formDialog = createHtmlEl({
        tag: "dialog",
        parent: mainDiv,
        props: {className: "form-dialog", id: "add-task-dialog"}});
    const formToDo = createHtmlEl({
        tag: "form",
        parent: formDialog,
        props: {className: "todo-form"},});

    const formFields = [
        {
            labelText: "Title: ",
            inputType: "text", 
            inputProps: {id: "title"},
            labelProps: {name: "title"},
            required: true,
        },
        {
            labelText: "Due Date: ",
            inputType: "date", 
            inputProps: {id: "due-date"},
            labelProps: {name: "due-date"},
            required: true,
        }
        ]

    formFields.forEach(field => createHtmlLabelInput({parent: formToDo, ...field}))

    const dueDateInput = document.querySelector("#due-date");
    dueDateInput.valueAsDate = new Date();

    const priorities = ["high", "medium", "low"]
    const prioritiesDiv = createHtmlEl({
        parent: formToDo,
        props: {className: "priorities-div"}})

    priorities.forEach(priority => createHtmlLabelInput({
        parent: prioritiesDiv,
        labelText: priority.charAt(0).toUpperCase() + priority.slice(1),
        inputType: "radio",
        inputProps: {id: priority, name: "priority", value: priority},
        required: true,
    }))

    const projectsDiv = createHtmlEl({
        parent: formToDo,
    })

    const selectProjectLabel = createHtmlEl({
        tag: "label", parent: projectsDiv, textContent: "Project: "})
        selectProjectLabel.htmlFor = "project-select"
    const selectProjectElement = createHtmlEl({
        tag: "select", parent: projectsDiv, props: {id: "project-select", name: "projects"}})
    sharedProjects.getAllProjects().toReversed().forEach(project => createHtmlEl({
        tag: "option", parent: selectProjectElement,
        props: {value: project.name},
        textContent: project.name
    }))

    const descriptionDiv = createHtmlEl({parent: formToDo})
    const descriptionLabel = createHtmlEl({
        tag: "label",
        parent: descriptionDiv,
        textContent: "Description: "
    })

    descriptionLabel.htmlFor = "task-description"
    const descriptionTextArea = createHtmlEl({
        tag: "textarea",
        parent: descriptionDiv,
        props: {
            id: "task-description",
            name: "task-description",
            rows: 3,
            columns: 4
        }
    })
    
    const getFormDialog = () => formDialog
    const getToDoForm = () => formToDo

    const getSubmitTaskBtn = () => createHtmlEl({
        tag: "button", parent: formToDo,
        props: {id: "submit-btn", type: "submit"}, textContent: "Add Task"})

    const getCancelTaskBtn = () => createHtmlEl({
        tag: "button", parent: formToDo,
        props: {id: "cancel-btn", type: "button"}, textContent: "Cancel"})

    return { getFormDialog, getToDoForm, getSubmitTaskBtn, getCancelTaskBtn }
    }

export default createTodoItemForm