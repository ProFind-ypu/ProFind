import type { Professor } from "../class/Professor";
import type { ProjectInfo } from "../class/ProjectInfo";

/**
 * Filters an array of objects based on a search term and specified keys.
 * @param projectInfo - Array of objects to filter
 * @param searchTerm - The string to search for
 * @param keys - Array of object keys to include in the search
 * @returns Filtered array
 */
export const filterProjects = (
  projectInfo: ProjectInfo[],
  searchTerm: string,
  selectedTags?: Set<string>,
  keys?: (keyof ProjectInfo)[],
): ProjectInfo[] => {
  // //console.log(searchTerm);

  if (
    !searchTerm.trim() &&
    (selectedTags == undefined || selectedTags.size == 0)
  )
    return projectInfo;
  let tmp;
  // const lowercasedTerm = searchTerm.toLowerCase();
  const normalizedSearchValue = searchTerm.toLowerCase().trim();
  if (keys != undefined && keys.length != 0)
    tmp = projectInfo.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        return (
          value && String(value).toLowerCase().includes(normalizedSearchValue)
        );
      }),
    );
  else {
    tmp = projectInfo.filter((item) =>
      item.title.toLowerCase().includes(normalizedSearchValue),
    );
  }
  if (selectedTags != undefined && selectedTags.size > 0) {
    return tmp.filter((projinfo) => {
      return isSetsIntersected(projinfo.tags, selectedTags);
    });
  }
  return tmp;
};
function isSetsIntersected(setA: Set<string>, setB: Set<string>) {
  if (setA.size > setB.size) {
    for (const item of setB) {
      if (setA.has(item)) {
        return true;
      }
    }
  } else
    for (const item of setA) {
      if (setB.has(item)) {
        return true;
      }
    }
  return false;
}

/**
 * Debounces a function call.
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number,
): ((...args: any[]) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const filterProfessors = (
  professors: Professor[],
  searchTerm: string,
  selectedTags?: Set<string>,
  keys?: (keyof Professor)[],
): Professor[] => {
  if (
    !searchTerm.trim() &&
    (selectedTags == undefined || selectedTags.size == 0)
  )
    return professors;
  let tmp;
  const normalizedSearchValue = searchTerm.toLowerCase().trim();
  if (keys != undefined && keys.length != 0)
    tmp = professors.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        return (
          value && String(value).toLowerCase().includes(normalizedSearchValue)
        );
      }),
    );
  else {
    tmp = professors.filter((item) =>
      item.fullName.toLowerCase().includes(normalizedSearchValue),
    );
  }
  if (selectedTags != undefined && selectedTags.size > 0) {
    return tmp.filter((projinfo) => {
      return isSetsIntersected(new Set(projinfo.skills), selectedTags);
    });
  }
  return tmp;
};
