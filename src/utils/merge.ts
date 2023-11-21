export function mergeStrings(...strings: (string | undefined | null)[]) {
  // Filter out null, undefined, or empty strings
  const nonEmptyStrings = strings.filter(str => str && str.trim() !== "");

  // Join the non-empty strings with a comma
  return nonEmptyStrings.join(",");
}
