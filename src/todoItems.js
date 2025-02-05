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
    
    addTodoItem(title, dueDate, priority, description="") {
        let todoItem = new TodoItem(title, dueDate, priority, description)
        this.todoList.push(todoItem)
    }

    getItems() {
        return this.todoList;
    }
}

function projectList() {
    const projectList = [new Project("Other")]; //adds default other project
    const getProjectList = () => projectList;
    return { getProjectList }
}

export { TodoItem, Project, projectList }