import { sharedProjectsFactory } from './CreateProjects.js';
import { serialize } from './LocalStorage.js';

const sharedProjects = sharedProjectsFactory();

function populateLocalStorage() {
  localStorage.setItem('projects', serialize(sharedProjects));
}

export default populateLocalStorage;
