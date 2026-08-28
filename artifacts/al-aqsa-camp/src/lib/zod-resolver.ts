import { z } from 'zod';

export function zodResolver(schema: z.ZodType<any, any>) {
  return (values: any) => {
    const parsed = schema.safeParse(values);
    if (parsed.success) {
      return {};
    }
    const errors: Record<string, string> = {};
    parsed.error.errors.forEach((error) => {
      errors[error.path.join('.')] = error.message;
    });
    return errors;
  };
}
