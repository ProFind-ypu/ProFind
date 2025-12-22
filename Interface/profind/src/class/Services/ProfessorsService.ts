import type { Professor } from "../Professor";
import { getSuppervisors } from "./_getSuppervisorFromServer";

export default class ProfessorsService {
  private static instance: ProfessorsService;
  private suppervisor: Professor[] = [];

  private constructor() {}

  static getInstance(): ProfessorsService {
    if (!ProfessorsService.instance) {
      ProfessorsService.instance = new ProfessorsService();
    }
    return ProfessorsService.instance;
  }

  async fetchProjects(): Promise<Professor[]> {
    this.suppervisor = await getSuppervisors();
    return this.suppervisor;
  }

  getProjects(): Professor[] {
    return this.suppervisor;
  }
}
