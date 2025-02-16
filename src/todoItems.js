class TodoItem {
    constructor(title, dueDate, priority, description="") {
        if (!title) throw new Error("Title is required");
        if (priority && !["low", "medium", "high"].includes(priority.toLowerCase())) {
            throw new Error("Priority must be 'low', 'medium' or 'high'")
        }
        this.title = title;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.description = description;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todoList = [];
    }
    
    addTodo(title, dueDate, priority, description="") {
        let todoItem = new TodoItem(title, dueDate, priority, description)
        this.todoList.push(todoItem)
    }

    removeTodo(title) {
        this.todoList = this.todoList.filter(todo => todo.title !== title)
        // if (index >= 0 && index < this.todoList.length) {
        //   this.todoList.splice(index, 1);
        // }
      }

    getTodos() {
        return this.todoList;
    }
}

const sharedProjectsFactory = (() => {
    let instance = null;
    return () => {
    if (!instance) {
        instance = {
            projects: [new Project("Other")],

            addProject(title) {
                const newProject = new Project(title);
                this.projects.push(newProject);
            },

            removeProject(title) {
                this.projects = this.projects.filter(project => project.title !== title)
            },

            getProject(title) {
                return this.projects.find(project => project.title === title)
            },

            getAllProjects() {
                return this.projects;
            },
        }
    }
    return instance
    }
})()

function projectList() {
    const getProjectList = () => projectList;
    return { getProjectList }
}

export { Project, projectList, sharedProjectsFactory }