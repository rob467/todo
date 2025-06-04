import { TodoItem } from './todoItems.js';
import { revive } from './LocalStorage.js';

class Project {
  static projectId = 0;
  constructor(name) {
    Project.projectId++;
    this.id = Project.projectId;
    this.name = name;
    this.todoList = [];
  }

  addTodo(title, dueDate, priority, description = '') {
    let todoItem = new TodoItem(title, dueDate, priority, description);
    this.todoList.push(todoItem);
  }

  removeTodo(id) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  }

  removeTodoByIndex(index) {
    if (index >= 0 && index < this.todoList.length) {
      this.todoList.splice(index, 1);
    }
  }

  getTodo(id) {
    return this.todoList.find((todo) => todo.id === id);
  }

  getAllTodos() {
    return this.todoList;
  }
}

const sharedProjectsFactory = (() => {
  let instance = null;
  return () => {
    if (!instance) {
      let projectsValue;
      if (localStorage.length > 0) {
        projectsValue = JSON.parse(
          localStorage.getItem('projects'),
          revive
        ).projects;
      } else {
        projectsValue = [new Project('Other')];
      }
      instance = {
        projects: projectsValue,

        addProject(title) {
          const newProject = new Project(title);
          this.projects.push(newProject);
        },

        removeProject(name) {
          this.projects = this.projects.filter(
            (project) => project.name !== name
          );
        },

        getProject(name) {
          return this.projects.find((project) => project.name === name);
        },

        getProjectById(id) {
          return this.projects.find((project) => project.id === id);
        },

        getAllProjects() {
          return this.projects;
        },

        getProjectByChildTask(taskId) {
          return this.projects.find((project) => project.getTodo(taskId));
        },
      };
    }
    return instance;
  };
})();

export { Project, sharedProjectsFactory };
