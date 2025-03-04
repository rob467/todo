import {addTaskModal} from "./todo-form.js"
import { renderProjectComponent }  from "./ProjectsComponent.js"
import { renderMainProjectComponent, removeTaskOnCheck } from "./MainProjectViewComponent.js"
import { getInitialSidebarElements } from "./RenderSidebarComponent.js"
import { sharedProjectsFactory } from "./todoItems.js"

const sharedProjects = sharedProjectsFactory()

function taskComponent() {
    // Get initial elements and render project components
    const initialSidebar = getInitialSidebarElements();
    const addTaskButton = initialSidebar.addTaskBtn
    const projectComponent = renderProjectComponent();
    projectComponent.renderProjectsList();
    const renderMainProjects = renderMainProjectComponent();
    renderMainProjects.getProjectCards();
    }

export default taskComponent
