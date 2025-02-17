import { addProjectsComponent, renderProjectComponent } from "./ProjectsComponent.js"
import { Project, projectList, sharedProjectsFactory } from "./todoItems.js"
import { format, isToday, isTomorrow } from "date-fns";
import { createHtmlEl, createHtmlLabelInput, removeAllChildren } from "./AddDOMComponents.js"
import maxBtn from "./svgs/maximize-solid.svg"
import editBtn from "./svgs/pen-solid.svg"

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

    function renderTaskDetails(task, projectDiv) {
        const taskDiv = createHtmlEl({
            tag: "div", parent: projectDiv, 
            props: {
                className: `task-main div-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`
            }
        })

        createHtmlLabelInput({
            parent: taskDiv,
            createDiv: true,
            forLabel: `id-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`,
            id: `id-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`,
            inputType: "checkbox",
            labelTextContent: task.title,
            reverseInputOrder: true,
            labelClass: `cl-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}-label`
        })

        createHtmlEl(
            {tag: "h5", parent: taskDiv, textContent: formatCloseDates(task.dueDate)}
        )
        }
    

    function getProjectCards() {
        while (mainProjectsDiv.firstChild) {
            mainProjectsDiv.removeChild(mainProjectsDiv.firstChild)
        }
        
        function createProjectCard(project) {
            const projectCardDiv = createHtmlEl({tag: "div", parent: mainProjectsDiv,
                props: {className: "project-card", id: `card-${project.name.replace(/\s+/g, '-')}`},
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
            let sortedByDateProjects = project.getTodos().sort(
                (a, b) => a.dueDate - b.dueDate
            )
            sortedByDateProjects.forEach(
                task => renderTaskDetails(task, projectCardDiv)
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
            project.getTodos().forEach(task => {

        const taskMainDiv = document.querySelector(
            `.div-${task.title.replace(/[^a-zA-Z0-9-_]/g, '_')}`
        )
        project.removeTodo(task.title)
        taskMainDiv.remove()
        renderProjectComponent().renderTaskList(project)
    }))
}

function removeTaskOnCheck() {
    sharedProjects.getAllProjects().forEach(
        project => 
            project.getTodos().forEach(task => {
        const taskCheckbox = document.querySelector(`#id-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`)
        taskCheckbox.addEventListener("change", handleCheckedTask)}))
    }


export {renderMainProjectComponent, removeTaskOnCheck}