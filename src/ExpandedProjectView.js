import createModal from './ModalComponent.js';
import { sharedProjectsFactory } from './CreateProjects.js';

const expandedProjectModal = createModal({
    id: 'expanded-project-dialog',
    parent: document.querySelector('.main'),
    formProps: { className: 'form-dialog' },
    content: [
    {
      type: 'input',
      forLabel: 'edit-project-name',
      labelText: 'Project: ',
      inputProps: {
        id: 'edit-project-name',
        name: 'edit-project-name',
      },
      required: true,
    },
    
    ]
});

export { expandedProjectModal }