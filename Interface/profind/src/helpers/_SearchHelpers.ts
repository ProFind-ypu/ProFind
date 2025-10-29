// src/helpers/searchHelpers.ts

/**
 * Filters an array of objects based on a search term and specified keys.
 * @param items - Array of objects to filter
 * @param searchTerm - The string to search for
 * @param keys - Array of object keys to include in the search
 * @returns Filtered array
 */
export const filterItems = <T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  keys: (keyof T)[]
): T[] => {
    console.log(searchTerm);
    
  if (!searchTerm.trim()) return items;

  const lowercasedTerm = searchTerm.toLowerCase();

  return items.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      return value && String(value).toLowerCase().includes(lowercasedTerm);
    })
  );
};

/**
 * Debounces a function call.
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
): ((...args: any[]) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};