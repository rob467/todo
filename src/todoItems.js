import loadLocalStorage from './LoadLocalStorage.js';

class TodoItem {
  static taskId = 0;
  constructor(title, dueDate, priority, description = '') {
    TodoItem.taskId++;
    this.id = TodoItem.taskId;
    if (!title) throw new Error('Title is required');
    if (
      priority &&
      !['low', 'medium', 'high'].includes(priority.toLowerCase())
    ) {
      throw new Error("Priority must be 'low', 'medium' or 'high'");
    }
    this.title = title;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.description = description;
  }

  editTodo(title, dueDate, priority, description) {
    (this.title = title),
      (this.dueDate = new Date(dueDate)),
      (this.priority = priority),
      (this.description = description);
  }
}

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
      if (loadLocalStorage()) {
        projectsValue = loadLocalStorage();
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
