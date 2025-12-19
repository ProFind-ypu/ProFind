import { getProjects } from "../helpers/_getProjectsFromServer";
import type { ProjectInfo } from "./ProjectInfo";

export default class ProjectService {
  private static instance: ProjectService;
  private projects: ProjectInfo[] = [];

  private constructor() {}

  static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  async fetchProjects(): Promise<ProjectInfo[]> {
    this.projects = await getProjects(); // Replace with actual method
    return this.projects;
  }

  getProjects(): ProjectInfo[] {
    return this.projects;
  }
}
