import axios from "axios";
import type { Professor } from "../Professor";
export const getSuppervisors = async (): Promise<Professor[]> => {
  try {
    const response = await axios.get<Professor[]>("/api/professors");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
