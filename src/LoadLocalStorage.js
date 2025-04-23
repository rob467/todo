import { Project } from './todoItems.js';

function loadLocalStorage() {
  if (localStorage.length) {
    let projects = JSON.parse(localStorage.getItem('projects')).map((project) =>
      Object.assign(new Project(), project)
    );
    if (projects.some((project) => project.getAllTodos().length > 0)) {
      projects = projects.map((project) => {
        project
          .getAllTodos()
          .forEach((task) => (task.dueDate = new Date(task.dueDate)));
        return project;
      });
    }
    return projects;
  }
}

export default loadLocalStorage;
