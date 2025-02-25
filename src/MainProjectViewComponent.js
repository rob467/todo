import { renderProjectComponent } from "./ProjectsComponent.js"
import { sharedProjectsFactory } from "./todoItems.js"
import { format, isToday, isTomorrow } from "date-fns";
import { createHtmlEl, createHtmlLabelInput, removeAllChildren } from "./AddDOMComponents.js"
import { createSingleTaskDialog } from "./SingleTaskDialogComponent.js"

import maxBtn from "./svgs/maximize-solid.svg"

const sharedProjects = sharedProjectsFactory();

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
            tag: "h5", parent: taskTextDiv, textContent: ` ${task.title}`
        })

        createHtmlEl(
            {tag: "h5", parent: taskTextDiv, textContent: formatCloseDates(task.dueDate)}
        )
        const taskDialog = createSingleTaskDialog(task, project)

        taskTextDiv.addEventListener("click", () => {
            taskDialog.getFormDialog().showModal();
        })

        

        taskDialog.getCancelTaskBtn().addEventListener("click", () => {
            taskDialog.getFormDialog().close();
        })
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