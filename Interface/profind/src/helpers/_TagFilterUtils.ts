/**
 * Adds a new tag if it doesn't already exist (case-insensitive)
 */
export const addTag = (tags: string[], newTag: string): string[] => {
  const trimmedTag = newTag.trim();
  if (!trimmedTag) return tags;
  const normalizedNewTag = trimmedTag.toLowerCase();
  const exists = tags.some(tag => tag.toLowerCase() === normalizedNewTag);
  return exists ? tags : [...tags, trimmedTag];
};

/**
 * Removes a tag by value (case-sensitive exact match)
 */
export const removeTag = (tags: string[], tagToRemove: string): string[] => {
  return tags.filter(tag => tag !== tagToRemove);
};