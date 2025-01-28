import { TodoItem, Project } from "./todoItems.js"

function createHtmlEl({tag="div", parent, props={}, textContent=""}) {
    let element = document.createElement(tag);
    Object.assign(element, props);
    element.textContent = textContent;
    parent.append(element);
    return element;
}

function createHtmlLabelInput({parent, forName,
    inputType="text", labelTextContent="", required=false} = {}) {
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.htmlFor = forName;
    label.textContent = labelTextContent;

    input.setAttribute("id", forName);
    input.setAttribute("name", forName);
    input.setAttribute("type", inputType);
    input.setAttribute("required", required);

    parent.appendChild(label, input)
    parent.appendChild(input)
}


function createTodoItemForm() {
    const heroDiv = document.querySelector(".hero")
    const formDiv = createHtmlEl({tag: "div", parent: heroDiv, props: {className: "form-container"}});
    const formToDo = createHtmlEl({tag: "form", parent: formDiv, props: {className: "todo-form"},});

    createHtmlLabelInput({
        parent: formToDo,
        forName: "title",
        labelTextContent: "Title: ",
        required: true});
  
        createHtmlLabelInput({
            parent: formToDo,
            forName: "due-date",
            labelTextContent: "Due Date: ",
            inputType: "date",
            required: true});

    
    // const priorityLabel = createHtmlLabelInput("label", formDiv, "Low-Priority");
    // const priorityInput = createHtmlLabelInput("input", formDiv, {name: "low-priority", id: "low-priority", type: "checkbox"});
}

export default createTodoItemForm