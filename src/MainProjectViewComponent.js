import { sharedProjectsFactory } from "./todoItems.js"
import { format, isToday, isTomorrow } from "date-fns";
import { createHtmlEl, createHtmlLabelInput, removeAllChildren } from "./AddDOMComponents.js"
import { renderProjectComponent } from "./ProjectsComponent.js"
import { editTaskModal } from "./EditTaskModal.js"

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
        const projectDiv = document.querySelector(`#card-${project.id}`)

        const taskDiv = createHtmlEl({
            tag: "div", parent: projectDiv, 
            props: {
                className: `task-main`,
                id: `container-task-${task.id}`
            }
        })

        const taskCheckbox = createHtmlLabelInput({
            parent: taskDiv,
            createDiv: true,
            inputProps: {
                id: `check-${task.id}`
            },
            inputType: "checkbox",
            reverseInputOrder: true,
        })

        taskCheckbox.onclick = () => {
            project.removeTodo(task.id)
            taskMainDiv.remove();
            renderProjectComponent().renderProjectsList()
        }

        const taskTextDiv = createHtmlEl({
            parent: taskDiv, props: {className: "task-text-div"}
        })

        const titleHeading = createHtmlEl({
            tag: "h5",
            parent: taskTextDiv,
            props: {id: `heading-${task.id}`},
            textContent: ` ${task.title}`
        })

        const dateHeading = createHtmlEl({
            tag: "h5",
            parent: taskTextDiv,
            props: {id: `heading-date-${task.id}`},
            textContent: formatCloseDates(task.dueDate)
        })

        taskTextDiv.onclick = () => {
            document.querySelector("#edit-title").value = task.title
            document.querySelector("#edit-date").valueAsDate = task.dueDate
            document.querySelector("#task-id").value = task.id
            document.querySelector("#edit-project-select").value = project.id
            document.querySelector(
                `#edit-priority-${task.priority}`).setAttribute("checked", true)
            editTaskModal.open()
        };
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
                    id: `card-${project.id}`
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
    return { getProjectCards, renderTaskDetails }
}

export { renderMainProjectComponent }