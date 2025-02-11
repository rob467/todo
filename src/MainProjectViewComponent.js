import addProjectsComponent from "./ProjectsComponent.js"
import { Project, projectList } from "./todoItems.js"
import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"

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

    function getProjectCards() {
        while (mainProjectsDiv.firstChild) {
            mainProjectsDiv.removeChild(mainProjectsDiv.firstChild)
        }
        
        function createProjectCard(project) {
            const projectCardDiv = createHtmlEl({tag: "div", parent: mainProjectsDiv,
                props: {className: "project-card", id: `${project.name.replace(/\s+/g, '-')}-card`},
            })
            createHtmlEl({tag: "h3", parent: projectCardDiv, textContent: project.name})
            project.todoList.forEach(task => createHtmlEl({tag: "h4", parent: projectCardDiv,
                textContent: task.title
            }))
            console.log(project.todoList)
            project.todoList.forEach(task => console.log(task.title)
            )
        }

        projects.forEach(project => createProjectCard(project))
    }
    return { getProjectCards }
}
export default renderMainProjectComponent