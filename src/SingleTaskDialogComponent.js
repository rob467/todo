import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import { projectList, sharedProjectsFactory } from "./todoItems.js"
import { renderMainProjectComponent, removeTaskOnCheck } from "./MainProjectViewComponent.js"

import trashBtn from "./svgs/trash-solid.svg"

const sharedProjects = sharedProjectsFactory()

function createSingleTaskDialog(task, project) {
    
    const mainDiv = document.querySelector(".main")

    const taskDialog = createHtmlEl({
        tag: "dialog",
        parent: mainDiv,
        props: {
            className: "form-dialog",
            id: "edit-task-dialog"}
    });

    const taskForm = createHtmlEl({
        tag: "form",
        parent: taskDialog,
        props: {className: "edit-task-form"},});

    const formFields = [
            {forLabel: "edit-title", labelTextContent: "Title: ",
                required: true, id: "edit-title", name: "title", value: task.title},
            {forLabel: "edit-due-date",labelTextContent: "Due Date: ",
                inputType: "date", required: true, id: "edit-due-date",
                name: "edit-due-date"}
            ]
    
        formFields.forEach(field => createHtmlLabelInput({parent: taskForm, ...field}))
    
        const dueDateInput = document.querySelector("#edit-due-date");
        dueDateInput.valueAsDate = new Date(task.dueDate.toString());
    
        const priorities = ["high", "medium", "low"]
        const prioritiesDiv = createHtmlEl({tag: "div", parent: taskForm});
        const projectsDiv = createHtmlEl({tag: "div", parent: taskForm});
    
        priorities.forEach(priority => createHtmlLabelInput({
            parent: prioritiesDiv, inputType: "radio", name: "priority",
            forLabel: priority, id: priority, required: true, value: priority,
            labelTextContent: priority.charAt(0).toUpperCase() + priority.slice(1),
        }))
    
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
                id: "task-description",
                name: "task-description"
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
    
        const getSubmitTaskBtn = () => createHtmlEl({
            tag: "button", parent: btnsDiv,
            props: {id: "edit-submit-btn", type: "submit"},
            textContent: "Save"})
    
        const getCancelTaskBtn = () => createHtmlEl({
            tag: "button", parent: btnsDiv,
            props: {id: "edit-cancel-btn", type: "button"},
            textContent: "Cancel"})
  
        const getDeleteBtn = () => createHtmlEl({
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
            getSubmitTaskBtn,
            getCancelTaskBtn,
            getDeleteBtn 
        }
}


export { createSingleTaskDialog }