import { randTags } from "../testing/constants";

export function getRandomSublist(size: number): string[] {
  if (size >= randTags.length) return [...randTags]; // Return shuffled copy if size >= length
  if (size <= 0) return [];

  const shuffled = [...randTags].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, size);
}
