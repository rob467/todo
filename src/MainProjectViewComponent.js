import addProjectsComponent from "./ProjectsComponent.js"
import { Project, projectList } from "./todoItems.js"
import { format, formatters, isToday, isTomorrow } from "date-fns";
import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"
import expandBtn from "./svgs/bars-solid.svg"
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

    // Calculates if date is today, tomorrow or further in future and returns that as a string
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
            tag: "div", parent: projectDiv, props: {className: "task-main"}
        })
        createHtmlEl(
            {tag: "h4", parent: taskDiv, textContent: task.title}
        )
        createHtmlEl(
            {tag: "h4", parent: taskDiv, textContent: formatCloseDates(task.dueDate)}
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
                tag: "div", parent: projectCardDiv, props: {className: "task-main"}
            })
            createHtmlEl({
                tag: "h3", parent: projectCardHeadingDiv, textContent: project.name
            })
            createHtmlEl({
                tag: "img", parent: projectCardHeadingDiv,
                props: {src: expandBtn, className:"logo-svg"}
            })
            project.todoList.forEach(task => renderTaskDetails(task, projectCardDiv))
        }

        projects.toReversed().forEach(project => createProjectCard(project))
    }
    return { getProjectCards }
}

export default renderMainProjectComponent