import taskComponent from "./AddTaskComponent.js"
import calWeekSVG from "./svgs/calendar-week-solid.svg"
import calDaySVG from "./svgs/calendar-day-solid.svg"
import calSolidSVG from "./svgs/calendar-solid.svg"
import { createHtmlEl } from "./AddDOMComponents.js"


function renderSidebar() {
    const sidebarDiv = document.querySelector(".sidebar")
    function calendarList() {
        const calendarList = createHtmlEl({tag: "ul", parent: sidebarDiv})
        const calendarSymbols = [
            [calDaySVG, "Today"], [calSolidSVG, "Tomorrow"], [calWeekSVG, "This week"]]
        calendarSymbols.forEach(symbol => {
            const listItem = createHtmlEl({
                tag: "li", parent: calendarList,
                props: {className: "calendar-list"},
                })
            createHtmlEl({
            tag: "img",
            parent: listItem,
            props: {src: symbol[0], className:"sidebar-logo-svg"}
            })
            createHtmlEl({
                tag: "span",
                parent: listItem,
                textContent: symbol[1]
            })
        })
    }
    calendarList();
    taskComponent();
}

export default renderSidebar