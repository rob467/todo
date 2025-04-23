import renderCalendarList from './CalendarComponent.js';
import { createHtmlEl } from './AddDOMComponents.js';
import { projectModal } from './ProjectsComponent.js';
import { addTaskModal, taskComponent } from './AddTaskComponent.js';

function createInitialSidebarElements() {
  const sidebarDiv = document.querySelector('.sidebar');

  const addTaskBtn = createHtmlEl({
    tag: 'button',
    parent: sidebarDiv,
    props: { id: 'add-task-btn' },
    textContent: 'Add Task',
  });

  addTaskBtn.onclick = () => {
    addTaskModal.open();
  };

  renderCalendarList();

  const projectHeadingDiv = createHtmlEl({
    tag: 'div',
    parent: sidebarDiv,
    props: { className: 'projects-heading-container' },
  });

  createHtmlEl({
    tag: 'h2',
    parent: projectHeadingDiv,
    textContent: 'Projects',
  });

  const addProjectBtn = createHtmlEl({
    tag: 'button',
    parent: projectHeadingDiv,
    props: {
      id: 'add-project-btn',
      type: 'submit',
    },
    textContent: '+',
  });

  addProjectBtn.onclick = () => projectModal.open();

  const projectListsDiv = createHtmlEl({
    tag: 'div',
    parent: sidebarDiv,
    props: { className: 'projects-sidebar-list-container' },
  });

  createHtmlEl({
    tag: 'ul',
    parent: projectListsDiv,
    props: { className: 'projects-sidebar-list' },
  });
}

function getInitialSidebarElements() {
  const addTaskBtn = document.querySelector('#add-task-btn');

  return { addTaskBtn };
}
function renderSidebar() {
  createInitialSidebarElements();
  taskComponent();
}

export { renderSidebar, getInitialSidebarElements };
