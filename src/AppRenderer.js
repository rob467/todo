import { renderMainProjectComponent } from './MainProjectViewComponent.js';
import { renderProjectComponent } from './ProjectsComponent.js';
import { renderCalendarTasks } from './CalendarComponent.js';

export default function rerenderApp() {
  renderCalendarTasks();
  renderMainProjectComponent().getProjectCards();
  renderProjectComponent().renderProjectsList();
}
