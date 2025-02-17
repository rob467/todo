import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import { projectList, sharedProjectsFactory } from "./todoItems.js"
import { renderMainProjectComponent, removeTaskOnCheck } from "./MainProjectViewComponent.js"

const sharedProjects = sharedProjectsFactory()

function createSingleTaskDialog() {    const mainDiv = document.querySelector(".main")

    const taskDialog = createHtmlEl({tag: "dialog", parent: mainDiv, props: {className: "form-dialog", id: "edit-task-dialog"}});
    const taskForm = createHtmlEl({tag: "form", parent: taskDialog, props: {className: "todo-form"},});

    
}