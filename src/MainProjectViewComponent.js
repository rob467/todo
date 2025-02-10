import addProjectsComponent from "./ProjectsComponent.js"
import { Project, projectList } from "./todoItems.js"
import { createHtmlEl, createHtmlLabelInput } from "./AddDOMComponents.js"

function getProjectCards () {
    const mainDiv = document.querySelector(".main");
    // const projects = projectList().getProjectList();
    
    function createProjectCard(project) {
        const projectCardDiv = createHtmlEl({tag: "div", parent: mainDiv,
            props: {className: "project-card", id: `${project.name.replace(/\s+/g, '-')}-card`},
        })
        createHtmlEl({tag: "h3", parent: projectCardDiv, textContent: project.name})
        project.todoList.forEach(task => createHtmlEl({tag: "h4", parent: mainDiv,
            textContent: task.title
        }))
    }

    projectList().getProjectList().forEach(project => createProjectCard(project))
    console.log(projectList().getProjectList())
}

export default getProjectCards