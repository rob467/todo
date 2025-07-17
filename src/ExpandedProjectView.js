import createModal from './ModalComponent.js';
import { sharedProjectsFactory } from './CreateProjects.js';
import { formatCloseDates } from './DateUtils.js';
import populateLocalStorage from './LoadLocalStorage.js';
import { renderMainProjectComponent } from './MainProjectViewComponent.js';
import { renderProjectComponent } from './ProjectsComponent.js';
import { validateProjectTitle } from './ProjectValidation.js';
import { renderTaskTitleBlock } from './RenderTaskCard.js';
import { createHtmlEl } from './AddDOMComponents.js';


const sharedProjects = sharedProjectsFactory();

const expandedProjectModal = createModal({
  id: 'expanded-project-dialog',
  parent: document.querySelector('.main'),
  className: 'expanded-project-dialog',
  formProps: { className: 'form-dialog expanded-project-form' },
  content: [],
  buttons: {
    save: (modal) => {
      const data = modal.getFormData();
      const project = sharedProjects.getProjectById(parseInt(data.projectId));
      const editProjectTitleInput = document.querySelector('#edit-project-name');

      const errorMsg = validateProjectTitle(
        data['edit-project-name'],
        sharedProjects,
        { excludeProjectId: parseInt(data.projectId) }
      );
      if (errorMsg) {
        editProjectTitleInput.setCustomValidity(errorMsg);
        editProjectTitleInput.reportValidity();
        return;
      }

      editProjectTitleInput.setCustomValidity('');
      sharedProjects.editProject(project.name, data['edit-project-name']);
      
      renderMainProjectComponent().getProjectCards();
      renderProjectComponent().renderProjectsList();
      populateLocalStorage();

      modal.dialog.close();
      modal.form.reset();
    },
    close: (modal) => {
      modal.dialog.close();
    },
    delete: (modal) => {
      const data = modal.getFormData();
      const project = sharedProjects.getProjectById(data.projectId);
      sharedProjects.removeProject(project.id);
      modal.dialog.close();
      modal.form.reset();
      populateLocalStorage();
    },
  },
});

function openExpandedProjectModal(projectId) {
  const project = sharedProjects.getProjectById(projectId);
  const content = [
    {
      type: 'input',
      forLabel: 'edit-project-name',
      inputProps: {
        id: 'edit-project-name',
        name: 'edit-project-name',
        value: project.name,
      },
      required: true,
    },
    {
      type: 'input',
      inputType: 'hidden',
      inputProps: {
        id: 'project-id',
        name: 'projectId',
        value: project.id,
      },
    },
    {
      type: 'custom',
      render: () => {
        const mainTaskContainer = document.createElement('div');
        project.todoList.forEach((task) => {
          const taskContainer = document.createElement('div');
          const taskDiv = createHtmlEl({
            tag: 'div',
            parent: taskContainer,
            props: {
              className: 'expanded-task-div',
            },
          });
          renderTaskTitleBlock(task, project, taskDiv, 'task-heading');

          if (task.description) {
            createHtmlEl({
              tag: 'div',
              parent: taskDiv,
              props: { className: 'expanded-task-description' },
              textContent: task.description,
            });
          }
          mainTaskContainer.appendChild(taskContainer);
        });
        return mainTaskContainer;
      },
    },
  ];

  if (project) {
    expandedProjectModal.setContent(content);
    expandedProjectModal.open();
  }
}

export { expandedProjectModal, openExpandedProjectModal };
