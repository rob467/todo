import createModal from './ModalComponent.js';
import { sharedProjectsFactory } from './todoItems.js';
import { renderMainProjectComponent } from './MainProjectViewComponent.js';
import { renderProjectComponent } from './ProjectsComponent.js';
import populateLocalStorage from './LocalStorage.js';

const sharedProjects = sharedProjectsFactory();

const editTaskModal = createModal({
  id: 'edit-task-dialog',
  parent: document.querySelector('.main'),
  formProps: { className: 'form-dialog' },
  content: [
    {
      type: 'input',
      forLabel: 'edit-title',
      labelText: 'Task: ',
      inputProps: {
        id: 'edit-title',
        name: 'edit-title',
      },
      required: true,
    },
    {
      type: 'input',
      forLabel: 'edit-date',
      labelText: 'Due date: ',
      inputType: 'date',
      inputProps: {
        id: 'edit-date',
        name: 'edit-date',
      },
      required: true,
    },
    {
      type: 'radio-group',
      name: 'edit-priority',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
      required: true,
      reverseOrder: true,
    },
    {
      type: 'select',
      props: { name: 'project', id: 'edit-project-select' },
      options: sharedProjects
        .getAllProjects()
        .toReversed()
        .map((project) => ({
          label: project.name,
          value: project.id,
        })),
    },
    {
      type: 'textarea',
      textareaLabel: 'Description: ',
      props: {
        id: 'edit-description',
        name: 'edit-description',
        rows: 3,
        cols: 17,
      },
    },
    {
      type: 'input',
      inputType: 'hidden',
      inputProps: {
        id: 'task-id',
        name: 'task-id',
      },
      required: true,
    },
  ],
  buttons: {
    Save: (modal) => {
      const data = modal.getFormData();
      data.project = parseInt(data.project);
      data['task-id'] = parseInt(data['task-id']);
      let currentProject = sharedProjects.getProjectByChildTask(
        parseInt(data['task-id'])
      );
      let currentTask = currentProject.getTodo(data['task-id']);
      const projectChanged = data.project !== currentProject['id'];

      if (modal.form.checkValidity()) {
        if (projectChanged) {
          currentProject.removeTodoByIndex(
            currentProject.getAllTodos().indexOf(currentTask)
          );
          let newProject = sharedProjects.getProjectById(data.project);
          newProject.getAllTodos().push(currentTask);
        }

        currentTask.editTodo(
          data['edit-title'],
          data['edit-date'],
          data['edit-priority'],
          data['edit-description']
        );

        modal.dialog.close();
        modal.form.reset();

        document.querySelector('#edit-date').valueAsDate = new Date();

        renderMainProjectComponent().getProjectCards();
        renderProjectComponent().renderProjectsList();
        populateLocalStorage();
      } else {
        modal.form.reportValidity();
      }
    },

    Cancel: (modal) => {
      modal.dialog.close();
    },

    delete: (modal) => {
      const data = modal.getFormData();
      sharedProjects
        .getProjectById(parseInt(data.project))
        .removeTodo(parseInt(data['task-id']));
      renderMainProjectComponent().getProjectCards();
      renderProjectComponent().renderProjectsList();
      modal.dialog.close();
      modal.form.reset();
      populateLocalStorage();
    },
  },
});

export { editTaskModal };
