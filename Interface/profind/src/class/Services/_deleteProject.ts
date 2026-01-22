import axios from "axios";
import type { Projectdto } from "./ProjectDto";
import { getToken } from "../../Auth/localStorage";
export interface createProjectResponce {
  projectId: number;
}
export const deleteProject = async (id: number): Promise<boolean> => {
  const response = await axios.delete<boolean>("/api/projects/" + id, {
    headers: { Authorization: "Bearer " + getToken() },
  });
  if (response.status == 200) {
    if (response.data == true) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
