export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")        // spaces → hyphens
    .replace(/[^\w\-]+/g, "")    // remove special chars (:, &, etc.)
    .replace(/\-\-+/g, "-")      // collapse multiple hyphens
    .replace(/^-+|-+$/g, "");    // trim edges
}
