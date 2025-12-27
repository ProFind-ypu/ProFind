import axios from "axios";
import type { Projectdto } from "./ProjectDto";
import { getToken } from "../../Auth/localStorage";
export interface createProjectResponce {
  projectId: number;
}
export const postNewProject = async (data: Projectdto): Promise<Projectdto> => {
  const response = await axios.post<Projectdto>("/api/projects", data, {
    headers: { Authorization: "Bearer " + getToken() },
  });
  return response.data;
};
