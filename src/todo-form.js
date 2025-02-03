import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"

function createTodoItemForm() {
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

    priorities.forEach(priority => createHtmlLabelInput({
        parent: prioritiesDiv, inputType: "radio", name: "priority",
        createDiv: false, forLabel: priority, id: priority,
        labelTextContent: priority.charAt(0).toUpperCase() + priority.slice(1),
    }))

    const getFormDialog = () => formDialog

    const getSubmitTaskBtn = () => createHtmlEl({
        tag: "button", parent: formToDo,
        props: {id: "submit-btn", type: "button"}, textContent: "Add Task"})

    const getCancelTaskBtn = () => createHtmlEl({
        tag: "button", parent: formToDo,
        props: {id: "cancel-btn"}, textContent: "Cancel"})

    return { getFormDialog, getSubmitTaskBtn, getCancelTaskBtn }
    }

export default createTodoItemForm