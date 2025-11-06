import { useMemo } from "react";
import type { ProjectInfo } from "../testing/constants";

/**
 * Filters an array of objects based on a search term and specified keys.
 * @param projectInfo - Array of objects to filter
 * @param searchTerm - The string to search for
 * @param keys - Array of object keys to include in the search
 * @returns Filtered array
 */
export const sortItems = (
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
        const dateA = new Date(a.creation_time).getTime();
        const dateB = new Date(b.creation_time).getTime();
        return dateB - dateA; // Descending: newer first
      });
      break;
    default:
      return projectInfo.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }
};
