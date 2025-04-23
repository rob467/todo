import { sharedProjectsFactory } from './todoItems.js';

const sharedProjects = sharedProjectsFactory();

function populateLocalStorage() {
  let projectStorage = null;
  const checkForTasks = sharedProjects.getAllProjects().some((project) => {
    return project.getAllTodos().length > 0;
  });
  if (checkForTasks) {
    projectStorage = sharedProjects.getAllProjects().map((project) => {
      project.getAllTodos().forEach((task) => {
        if (typeof task.dueDate === 'object') {
          task.dueDate = task.dueDate.toISOString();
        }
      });
      return project;
    });
  } else {
    projectStorage = sharedProjects.getAllProjects();
  }
  localStorage.setItem('projects', JSON.stringify(projectStorage));
}

export default populateLocalStorage;
