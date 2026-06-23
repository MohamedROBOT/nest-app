import { z } from 'zod';

export const loginSchema = z.strictObject({
  email: z.email('Email is not valid'),
  password: z.string('Password must be a valid string'),
});

export type LoginDto = z.infer<typeof loginSchema>;
