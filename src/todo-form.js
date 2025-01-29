import { TodoItem, Project } from "./todoItems.js"

function createHtmlEl({tag="div", parent, props={}, textContent=""}) {
    let element = document.createElement(tag);
    Object.assign(element, props);
    element.textContent = textContent;
    parent.append(element);
    return element;
}

function createHtmlLabelInput({parent, createDiv=true, forLabel, id, name,
    inputType="text", labelTextContent="", required=false} = {}) {
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.htmlFor = forLabel;
    label.textContent = labelTextContent;

    Object.assign(input, {
        id,
        name,
        type: inputType,
        required
    })

    if (createDiv) {
        const labelInputDiv = document.createElement("div");
        labelInputDiv.append(label, input);
        parent.appendChild(labelInputDiv)
    } else {
        parent.append(label, input);
    }
}


function createTodoItemForm() {
    const heroDiv = document.querySelector(".hero")
    const formDiv = createHtmlEl({tag: "div", parent: heroDiv, props: {className: "form-container"}});
    const formToDo = createHtmlEl({tag: "form", parent: formDiv, props: {className: "todo-form"},});

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

    createHtmlEl({
        tag: "button", parent: formToDo,
        props: {id: "submit-btn"}, textContent: "Add Task"})
    }

export default createTodoItemForm