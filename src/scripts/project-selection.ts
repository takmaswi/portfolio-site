export function getProjectIndex(
  slugs: readonly string[],
  slug: string | null,
): number {
  if (!slugs.length) return -1;
  const index = slugs.indexOf(slug ?? "");
  return index < 0 ? 0 : index;
}
export function nextProjectIndex(
  index: number,
  direction: number,
  count: number,
): number {
  return count > 0 ? (((index + direction) % count) + count) % count : -1;
}
