import createModal from './ModalComponent.js';
import { renderProjectComponent } from './ProjectsComponent.js';
import { renderMainProjectComponent } from './MainProjectViewComponent.js';
import { getInitialSidebarElements } from './RenderSidebarComponent.js';
import { sharedProjectsFactory } from './CreateProjects.js';
import populateLocalStorage from './LoadLocalStorage.js';

const sharedProjects = sharedProjectsFactory();

// const addTaskModal = createModal({
//   id: 'add-task-dialog',
//   parent: document.querySelector('.main'),
//   formProps: { className: 'form-dialog' },
//   content: [
//     {
//       type: 'input',
//       forLabel: 'task-title',
//       labelText: 'Task: ',
//       inputProps: {
//         id: 'task-title',
//         name: 'task-title',
//       },
//       required: true,
//     },
//     {
//       type: 'input',
//       forLabel: 'task-date',
//       labelText: 'Due date: ',
//       inputType: 'date',
//       dateDefault: new Date(),
//       inputProps: {
//         id: 'task-date',
//         name: 'task-date',
//       },
//       required: true,
//     },
//     {
//       type: 'radio-group',
//       name: 'priority',
//       options: [
//         { label: 'High', value: 'high' },
//         { label: 'Medium', value: 'medium' },
//         { label: 'Low', value: 'low' },
//       ],
//       required: true,
//       reverseOrder: true,
//     },
//     {
//       type: 'select',
//       props: { name: 'project', id: 'project-select' },
//       options: sharedProjects
//         .getAllProjects()
//         .toReversed()
//         .map((project) => ({
//           label: project.name,
//           value: project.id,
//         })),
//     },
//     {
//       type: 'textarea',
//       textareaLabel: 'Description: ',
//       props: {
//         id: 'task-description',
//         name: 'task-description',
//         rows: 3,
//         cols: 17,
//       },
//     },
//   ],
//   buttons: {
//     Save: (modal) => {
//       const data = modal.getFormData();
//       console.log(data);
//       // Validate form data
//       const taskTitle = document.querySelector('#task-title');
//       const taskDate = document.querySelector('#task-date');
//       const projectSelect = document.querySelector('#project-select');
//       // Check if task title, date, priority, and project are valid
//       if (data['task-title'].trim() === '') {
//         taskTitle.setCustomValidity('Task title required!');
//       } else if (data['task-date'].trim() === '') {
//         taskDate.setCustomValidity('Task date required!');
//       } else if (!data['priority']) {
//         const radios = document.querySelectorAll('input[name="priority"]');
//         radios.forEach((radio) => {
//           radio.setCustomValidity('Task priority required!');
//         });
//         radios[0].reportValidity();
//         return;
//       } else if (projectSelect.value === '') {
//         projectSelect.setCustomValidity('Project selection required!');
//       } else {
//         sharedProjects
//           .getProjectById(parseInt(data.project))
//           .addTodo(
//             data['task-title'],
//             data['task-date'],
//             data['priority'],
//             data['task-description']
//           );
//         modal.dialog.close();
//         modal.form.reset();
//         document.querySelector('#task-date').valueAsDate = new Date();
//         renderMainProjectComponent().getProjectCards();
//         renderProjectComponent().renderProjectsList();
//         populateLocalStorage();

//         // Reset form validation messages
//         taskTitle.setCustomValidity('');
//         taskDate.setCustomValidity('');
//         const radios = document.querySelectorAll('input[name="priority"]');
//         radios.forEach((radio) => {
//           radio.setCustomValidity('');
//         });
//         projectSelect.setCustomValidity('');
//       }
//       taskTitle.reportValidity();
//       taskDate.reportValidity();
//       projectSelect.reportValidity();
//     },
//     Cancel: (modal) => {
//       modal.dialog.close();
//       modal.form.reset();
//       document.querySelector('#task-date').valueAsDate = new Date();
//     },
//   },
// });

function taskComponent() {
  // Get initial elements and render project components
  const initialSidebar = getInitialSidebarElements();
  // const addTaskButton = initialSidebar.addTaskBtn;
  const projectComponent = renderProjectComponent();
  projectComponent.renderProjectsList();
  const renderMainProjects = renderMainProjectComponent();
  renderMainProjects.getProjectCards();
}

export { taskComponent };
