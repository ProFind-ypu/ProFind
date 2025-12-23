import type { Professor } from "../class/Professor";
import type { ProjectInfo } from "../class/ProjectInfo";

/**
 * Filters an array of objects based on a search term and specified keys.
 * @param projectInfo - Array of objects to filter
 * @param searchTerm - The string to search for
 * @param keys - Array of object keys to include in the search
 * @returns Filtered array
 */
export const sortProjects = (
  projectInfo: ProjectInfo[],
  sortOption?: string,
): ProjectInfo[] => {
  if (sortOption == undefined) return projectInfo;
  switch (true) {
    case sortOption == "title":
      return projectInfo.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case sortOption == "time_of_creation":
      return projectInfo.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Descending: newer first
      });
      break;
    default:
      return projectInfo.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }
};
export const sortProfessors = (
  projectInfo: Professor[],
  sortOption?: string,
): Professor[] => {
  if (sortOption == undefined) return projectInfo;
  switch (true) {
    case sortOption == "name":
      return projectInfo.sort((a, b) => a.fullName.localeCompare(b.fullName));
      break;
    case sortOption == "department":
      return projectInfo.sort((a, b) =>
        a.department.localeCompare(b.department),
      );
      break;
    default:
      return projectInfo.sort((a, b) => a.fullName.localeCompare(b.fullName));
      break;
  }
};
