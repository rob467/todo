import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import { projectList, sharedProjectsFactory } from "./todoItems.js"
import { renderMainProjectComponent, removeTaskOnCheck } from "./MainProjectViewComponent.js"

import trashBtn from "./svgs/trash-solid.svg"

const sharedProjects = sharedProjectsFactory()

function createSingleTaskDialog() {
    
    const mainDiv = document.querySelector(".main")

    const taskDialog = createHtmlEl({
        tag: "dialog",
        parent: mainDiv,
        props: {
            className: "form-dialog",
            id: `edit-task-dialog`}
    });

    const taskForm = createHtmlEl({
        tag: "form",
        parent: taskDialog,
        props: {className: "edit-task-form"},});

    const formFields = [
            {forLabel: "edit-title", labelTextContent: "Title: ",
                required: true, id: "edit-title", name: "title"},
            {forLabel: "edit-due-date",labelTextContent: "Due Date: ",
                inputType: "date", required: true, id: "edit-due-date",
                name: "edit-due-date"}
            ]
    
        formFields.forEach(field => createHtmlLabelInput({parent: taskForm, ...field}))
    
        // const editDueDateInput = document.querySelector("#edit-due-date");
        // editDueDateInput.valueAsDate = new Date(task.dueDate.toString());
    
        const priorities = ["high", "medium", "low"]
        const prioritiesDiv = createHtmlEl({tag: "div", parent: taskForm});
    
        priorities.forEach(priority => {
        createHtmlLabelInput({
            parent: prioritiesDiv, inputType: "radio", name: "edit-priority",
            forLabel: `edit-${priority}`, id: `edit-${priority}`, required: true, value: priority,
            labelTextContent: priority.charAt(0).toUpperCase() + priority.slice(1),
        })
        
    })
    
        const descriptionDiv = createHtmlEl({parent: taskForm})
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
                id: "edit-task-description",
                name: "edit-task-description"
            }
        })

        descriptionTextArea.setAttribute("rows", 3)
        descriptionTextArea.setAttribute("columns", 4)
        
        const getFormDialog = () => taskDialog
        const getEditTaskForm = () => taskForm

        const btnsDiv = createHtmlEl({
            parent: taskForm,
            props: {className: "btns-div"}
        })
    
        createHtmlEl({
            tag: "button", parent: btnsDiv,
            props: {id: "edit-submit-btn", type: "submit"},
            textContent: "Save"})
    
        createHtmlEl({
            tag: "button", parent: btnsDiv,
            props: {id: "edit-cancel-btn", type: "button"},
            textContent: "Cancel"})
  
        createHtmlEl({
            tag: "img", parent: btnsDiv,
            props: {
                src: trashBtn,
                id: "delete-task-btn",
                className: "logo-svg-small"
            }
        })

    
        return {
            getFormDialog,
            getEditTaskForm,
        }
}


export { createSingleTaskDialog }