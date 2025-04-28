export function toFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  }

  return formData;
}
