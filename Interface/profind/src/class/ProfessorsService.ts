import { getSuppervisors } from "../helpers/_getSuppervisorFromServer";
import type { Professor } from "./Professor";

export default class ProjectService {
  private static instance: ProjectService;
  private suppervisor: Professor[] = [];

  private constructor() {}

  static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }
    return ProjectService.instance;
  }

  async fetchProjects(): Promise<Professor[]> {
    this.suppervisor = await getSuppervisors();
    return this.suppervisor;
  }

  getProjects(): Professor[] {
    return this.suppervisor;
  }
}
