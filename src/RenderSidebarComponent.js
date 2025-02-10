import taskComponent from "./AddTaskComponent.js"
import renderCalendarList from "./CalendarComponent.js"


function renderSidebar() {
    const sidebarDiv = document.querySelector(".sidebar")
    renderCalendarList();
    taskComponent();
}

export default renderSidebar