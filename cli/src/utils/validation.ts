export function validateProjectName(value: string): true | string {
  const trimmed = value.trim();
  if (!trimmed) return "Project name is required.";
  if (!/^[a-zA-Z0-9-_ ]+$/.test(trimmed)) {
    return "Use letters, numbers, spaces, dashes, or underscores for the project name.";
  }
  return true;
}

export function validateSiteName(value: string): true | string {
  const trimmed = value.trim();
  if (!trimmed) return "Website name is required.";
  if (trimmed.length > 80) return "Website name must be 80 characters or fewer.";
  if (!/^[a-zA-Z0-9][a-zA-Z0-9 .&_-]*$/.test(trimmed)) {
    return "Use letters, numbers, spaces, periods, ampersands, dashes, or underscores for the website name.";
  }
  return true;
}
