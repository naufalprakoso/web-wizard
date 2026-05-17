export function validateProjectName(value: string): true | string {
  const trimmed = value.trim();
  if (!trimmed) return "Project name is required.";
  if (!/^[a-zA-Z0-9-_ ]+$/.test(trimmed)) {
    return "Use letters, numbers, spaces, dashes, or underscores for the project name.";
  }
  return true;
}
