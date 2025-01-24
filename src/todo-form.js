import { TodoItem, Project } from "./todoItems.js"

function createHtmlEl(tag="div", parent, props={}, textContent="") {
    let element = document.createElement(tag);
    Object.assign(element, props);
    parent.append(element);
    element.textContent = textContent;
    return element;
}

const getText = document.createTextNode.bind(document);

function createTodoItemForm() {
    const heroDiv = document.querySelector(".hero")
    const formDiv = createHtmlEl("div", heroDiv, {className: "form-container"});
    const formToDo = createHtmlEl("form", formDiv, {className: "todo-form"},)
    const labelTitle = createHtmlEl("label", formDiv, {}, "")
}

export default createTodoItemForm