import { formatCloseDates } from './DateUtils.js';
import { createHtmlEl, createHtmlLabelInput } from './AddDOMComponents.js';
import populateLocalStorage from './LoadLocalStorage.js';
import { renderProjectComponent } from './ProjectsComponent.js';
import { renderMainProjectComponent } from './MainProjectViewComponent.js';

export function renderTaskTitleBlock(task, project, parentDiv) {
  const taskDiv = createHtmlEl({
    tag: 'div',
    parent: parentDiv,
    props: {
      className: `task-main`,
      id: `container-task-${task.id}`,
    },
  });

  const taskCheckbox = createHtmlLabelInput({
    parent: taskDiv,
    createDiv: true,
    inputProps: {
      id: `check-${task.id}`,
    },
    inputType: 'checkbox',
    reverseInputOrder: true,
  });

  taskCheckbox.onclick = () => {
    project.removeTodo(task.id);
    taskDiv.remove();
    renderProjectComponent().renderProjectsList();
    renderMainProjectComponent().getProjectCards();
    populateLocalStorage();
  };

  const taskHeading = document.createElement('div');
  taskHeading.className = 'task-item';
  taskHeading.textContent = `${task.title} - ${formatCloseDates(task.dueDate)}`;
  taskDiv.appendChild(taskHeading);

  return taskHeading;
}
