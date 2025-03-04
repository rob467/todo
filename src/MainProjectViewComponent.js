// import { renderProjectComponent } from "./ProjectsComponent.js"
import { sharedProjectsFactory } from "./todoItems.js"
import { format, isToday, isTomorrow } from "date-fns";
import { createHtmlEl, createHtmlLabelInput, removeAllChildren } from "./AddDOMComponents.js"
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
            inputProps: {
                id: `id-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`
            },
            inputType: "checkbox",
            reverseInputOrder: true,
        })

        const taskTextDiv = createHtmlEl({
            parent: taskDiv, props: {className: "task-text-div"}
        })

        const titleHeading = createHtmlEl({
            tag: "h5",
            parent: taskTextDiv,
            props: {id: `heading-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`},
            textContent: ` ${task.title}`
        })

        const dateHeading = createHtmlEl({
            tag: "h5",
            parent: taskTextDiv,
            props: {id: `heading-date-${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}`},
            textContent: formatCloseDates(task.dueDate)
        })

        taskTextDiv.onclick = () => {
            // editTaskModal.editForm("edit")
            document.querySelector("#edit-title").value = task.title
            document.querySelector("#edit-date").valueAsDate = task.dueDate
            document.querySelector("#task-id").value = task.id
            document.querySelector(
                `#edit-priority-${task.priority}`).setAttribute("checked", true)
            console.log(editTaskModal.getFormData())
            editTaskModal.open()
        
            // deleteBtn.addEventListener("click", () => {
            //         sharedProjects.getProject(project.name).removeTodo(task.title)
            //         taskDiv.remove()
    
            //         taskDialog.getFormDialog().close()
            //     }
            // )
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
    return { getProjectCards, renderTaskDetails }
} 

function handleCheckedTask() {
    sharedProjects.getAllProjects().forEach(
        project => 
            project.getAllTodos().forEach(task => {

        const taskMainDiv = document.querySelector(
            `#div-${task.title.replace(/[^a-zA-Z0-9-_]/g, '_')}`
        )
        project.removeTodo(task.id)
        taskMainDiv.remove();
        console.log(project);
        renderMainProjectComponent().renderTaskDetails(task, project)
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


export { renderMainProjectComponent, removeTaskOnCheck }