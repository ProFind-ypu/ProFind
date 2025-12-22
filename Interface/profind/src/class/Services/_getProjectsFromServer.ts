import axios from "axios";
import type { ProjectInfo } from "../ProjectInfo";

export const getProjects = async (): Promise<ProjectInfo[]> => {
  try {
    const response = await axios.get<ProjectInfo[]>("/api/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
