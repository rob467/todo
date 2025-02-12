import addProjectsComponent from "./ProjectsComponent.js"
import { Project, projectList } from "./todoItems.js"
import { format, isToday, isTomorrow } from "date-fns";
import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import maxBtn from "./svgs/maximize-solid.svg"
import editBtn from "./svgs/pen-solid.svg"

function renderMainProjectComponent(projectsList) {
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

    const projects = projectsList;

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
    function handleCheckedTask() {
    }


    function renderTaskDetails(task, projectDiv) {
        const taskDiv = createHtmlEl({
            tag: "div", parent: projectDiv, props: {className: `task-main ${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}-div`}
        })

        createHtmlLabelInput({
            parent: taskDiv,
            createDiv: true,
            forLabel: task.title.replace(/[^a-zA-Z0-9-_]/g, '-'),
            id: task.title.replace(/[^a-zA-Z0-9-_]/g, '-'),
            inputType: "checkbox",
            labelTextContent: task.title,
            reverseInputOrder: true,
            labelClass: `${task.title.replace(/[^a-zA-Z0-9-_]/g, '-')}-label`
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
                props: {className: "project-card", id: `${project.name.replace(/\s+/g, '-')}-card`},
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
            let sortedByDateProjects = project.todoList.sort((a, b) => a.dueDate - b.dueDate)
            sortedByDateProjects.forEach(task => renderTaskDetails(task, projectCardDiv))
        }

        projects.toReversed().forEach(project => createProjectCard(project))
    }

    function removeTaskOnCheck() {
        // Get sidebar projects div for rerendering
        projectsList.forEach(project => project.todoList.forEach(task => {
            const taskCheckbox = document.querySelector(`#${task.title.replace(/[^a-zA-Z0-9-_]/g, '_')}`)
            const taskMainDiv = document.querySelector(`.${task.title.replace(/[^a-zA-Z0-9-_]/g, '_')}-div`)
            taskCheckbox.addEventListener("change", () => {
                console.log(project.todoList)
                    // while (projectsSidebar.firstChild) {
                    //     projectsSidebar.removeChild(projectsSidebar.firstChild)
                    // }
                    project.todoList = project.todoList.filter(
                        allTasks => allTasks.title !== task.title
                    )
                    taskMainDiv.remove()
                    // addProjectsComponent().renderTaskList(project)
                })
            console.log(project.todoList)
        }))
        console.log(projectsList)
    }

    return { getProjectCards, removeTaskOnCheck }
}

export default renderMainProjectComponent