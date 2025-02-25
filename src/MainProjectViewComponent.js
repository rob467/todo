import { renderProjectComponent } from "./ProjectsComponent.js"
import { sharedProjectsFactory } from "./todoItems.js"
import { format, isToday, isTomorrow } from "date-fns";
import { createHtmlEl, createHtmlLabelInput, removeAllChildren } from "./AddDOMComponents.js"
import { createSingleTaskDialog } from "./SingleTaskDialogComponent.js"

import maxBtn from "./svgs/maximize-solid.svg"

const sharedProjects = sharedProjectsFactory();
const taskDialog = createSingleTaskDialog();

function renderMainProjectComponent() {
    const mainDiv = document.querySelector(".main");
        
    let mainProjectsDiv;

    if (!document.body.contains(document.querySelector(".main-projects-container"))) {
        mainProjectsDiv = createHtmlEl({tag: "div", parent: mainDiv,
            props: {className: "main-projects-container"}
        })
        mainProjectsDiv;
    } else {
        mainProjectsDiv = document.querySelector(".main-projects-container")
        mainProjectsDiv;
    }

    // Calculates if date is today, tomorrow or further in future and returns as string
    function formatCloseDates(date) {
        if (isToday(date)) {
            return "Today"
        } else if (isTomorrow(date)) {
            return "Tomorrow"
        } else {
            return format(date, "dd-MMM-yyyy")
        }
    }

    function renderTaskDetails(task, project) {
        const projectDiv = document.querySelector(`#card-${project.name.replace(/\s+/g, '-')}`)

        const taskDiv = createHtmlEl({
            tag: "div", parent: projectDiv, 
            props: {
                className: `task-main`,
                id: `div-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`
            }
        })

        createHtmlLabelInput({
            parent: taskDiv,
            createDiv: true,
            id: `id-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`,
            inputType: "checkbox",
            reverseInputOrder: true,
        })

        const taskTextDiv = createHtmlEl({
            parent: taskDiv, props: {className: "task-text-div"}
        })

        createHtmlEl({
            tag: "h5",
            parent: taskTextDiv,
            props: {id: `heading-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`},
            textContent: ` ${task.title}`
        })

        createHtmlEl({
            tag: "h5",
            parent: taskTextDiv,
            props: {id: `heading-date-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`},
            textContent: formatCloseDates(task.dueDate)
        })

        taskTextDiv.addEventListener("click", () => {
            document.querySelector("#edit-title").value = task.title
            document.querySelector("#edit-due-date").valueAsDate = new Date(task.dueDate.toString());
            document.querySelector("#edit-task-description").value = task.description
            
            let priorityEl = document.querySelector(`#edit-${task.priority}`)
            if (priorityEl.value === task.priority) {
                priorityEl.setAttribute("checked", true);
            }
            taskDialog.getFormDialog().showModal();
        })

        document.querySelector("#edit-submit-btn").addEventListener(
            "click", (e) => {
                e.preventDefault();
                console.log("working?")
                const currentTask = (
                    sharedProjects.getProject(project.name).getTodo(task.title)
                )

                const renderedTitle = document.querySelector(
                    `#heading-${
                        task.title.replace(/[^a-zA-Z0-9-_]/g, '-')
                    }`
                )
                
                const renderedDate = document.querySelector(
                    `#heading-date-${
                        task.title.replace(/[^a-zA-Z0-9-_]/g, '-')
                    }`
                )

                currentTask.title = document.querySelector(
                    "#edit-title").value
                currentTask.dueDate = document.querySelector(
                    "#edit-due-date").value
                currentTask.priority = document.querySelector(
                    "input[name='edit-priority']:checked").value
                currentTask.description = document.querySelector(
                    "#edit-task-description").value

                
                renderedTitle.textContent = currentTask.title
                renderedDate.textContent = formatCloseDates(currentTask.dueDate)

                taskDialog.getFormDialog().close()
            }
        )

        document.querySelector("#edit-cancel-btn").addEventListener(
            "click", () => {taskDialog.getFormDialog().close();})
    }

    function getProjectCards() {
        while (mainProjectsDiv.firstChild) {
            mainProjectsDiv.removeChild(mainProjectsDiv.firstChild)
        }
        
        function createProjectCard(project) {
            const projectCardDiv = createHtmlEl({
                tag: "div", parent: mainProjectsDiv,
                props: {
                    className: "project-card",
                    id: `card-${project.name.replace(/\s+/g, '-')}`
                },
            })

            const projectCardHeadingDiv = createHtmlEl({
                tag: "div", parent: projectCardDiv, props: {className: "project-heading"}
            })

            createHtmlEl({
                tag: "h3", parent: projectCardHeadingDiv, textContent: project.name
            })

            createHtmlEl({
                tag: "img", parent: projectCardHeadingDiv,
                props: {src: maxBtn, className:"logo-svg"}
            })

            let sortedByDateProjects = project.getAllTodos().sort(
                (a, b) => a.dueDate - b.dueDate
            )

            sortedByDateProjects.forEach(
                task => renderTaskDetails(task, project)
            )
        }

        sharedProjects.getAllProjects().toReversed().forEach(
            project => createProjectCard(project)
        )
    }
    return { getProjectCards }
} 

function handleCheckedTask() {
    sharedProjects.getAllProjects().forEach(
        project => 
            project.getAllTodos().forEach(task => {

        const taskMainDiv = document.querySelector(
            `#div-${task.title.replace(/[^a-zA-Z0-9-_]/g, '_')}`
        )
        project.removeTodo(task.title)
        taskMainDiv.remove()
        renderProjectComponent().renderTaskList(project)
    }))
}

function removeTaskOnCheck() {
    sharedProjects.getAllProjects().forEach(
        project => 
            project.getAllTodos().forEach(task => {
        const taskCheckbox = document.querySelector(
            `#id-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`
        )
        taskCheckbox.addEventListener("change", handleCheckedTask)}))
    }


export {renderMainProjectComponent, removeTaskOnCheck}