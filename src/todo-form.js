import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import createModal from "./ModalComponent.js";
import { projectList, sharedProjectsFactory } from "./todoItems.js"
import { format, isToday, isTomorrow } from "date-fns";
import { renderMainProjectComponent } from "./MainProjectViewComponent.js"
import { renderProjectComponent } from "./ProjectsComponent.js"


const sharedProjects = sharedProjectsFactory();

const addTaskModal = createModal({
    id: "add-task-dialog",
    parent: document.querySelector(".main"),
    formProps: {className: "form-dialog"},
    content: [
        {
            type: "input",
            forLabel: "task-title",
            labelText: "Task: ",
            inputProps: {
                id: "task-title",
                name: "task-title"},
            required: true
        },
        {
            type: "input",
            forLabel: "task-date",
            labelText: "Due date: ",
            inputType: "date",
            dateDefault: new Date(),
            inputProps: {
                id: "task-date",
                name: "task-date",
            },
            required: true
        },
        {
            type: "radio-group",
            name: "priority",
            options: [
                { label: "High", value: "high" },
                { label: "Medium", value: "medium" },
                { label: "Low", value: "low" },
            ],
            required: true,
            reverseOrder: true,
        },
        {
            type: "select",
            props: {name: "project", id: "project-select"},
            options: sharedProjects.getAllProjects().toReversed().map(project => ({
                label: project.name,
                value: project.id
            }))
        },
        {
            type: "textarea",
            textareaLabel: "Description: ",
            props: {
                id: "task-description",
                name: "task-description",
                rows: 3,
                cols: 17,
            }
        }
    ],
    buttons: {
        Save: (modal) => {
            const data = modal.getFormData();
            if (modal.form.checkValidity()) {
                sharedProjects.getProjectById(parseInt(data.project)).addTodo(
                    data["task-title"],
                    data["task-date"],
                    data["priority"],
                    data["task-description"]
                )
                modal.dialog.close();
                modal.form.reset();
                document.querySelector("#task-date").valueAsDate = new Date()
                renderMainProjectComponent().getProjectCards();
                renderProjectComponent().renderProjectsList();
                } else {modal.form.reportValidity()}
            },
        Cancel: (modal) => {
                modal.dialog.close();
                modal.form.reset();
                document.querySelector("#task-date").valueAsDate = new Date();
            },

    }
})

export { addTaskModal }