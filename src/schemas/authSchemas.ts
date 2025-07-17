
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('validation.email'),
  password: z.string().min(6, 'validation.minLength')
});

export const registerSchema = z.object({
  email: z.string().email('validation.email'),
  password: z.string().min(6, 'validation.minLength'),
  confirmPassword: z.string().min(6, 'validation.minLength'),
  name: z.string().min(2, 'validation.minLength')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'validation.passwordMismatch',
  path: ['confirmPassword']
});

export const legalTextSchema = z.object({
  title: z.string().min(5, 'validation.minLength'),
  type: z.enum(['Constitution', 'Loi', 'Ordonnance', 'Décret', 'Arrêté']),
  domain: z.string().min(1, 'validation.required'),
  institution: z.string().min(1, 'validation.required'),
  datePublication: z.date(),
  description: z.string().min(10, 'validation.minLength'),
  content: z.string().min(50, 'validation.minLength')
});

export const procedureSchema = z.object({
  title: z.string().min(5, 'validation.minLength'),
  category: z.string().min(1, 'validation.required'),
  institution: z.string().min(1, 'validation.required'),
  description: z.string().min(10, 'validation.minLength'),
  steps: z.array(z.object({
    title: z.string().min(1, 'validation.required'),
    description: z.string().min(1, 'validation.required'),
    duration: z.string().optional(),
    required: z.boolean().default(true)
  })).min(1, 'validation.required'),
  documents: z.array(z.string()).min(1, 'validation.required'),
  duration: z.string().min(1, 'validation.required')
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LegalTextFormData = z.infer<typeof legalTextSchema>;
export type ProcedureFormData = z.infer<typeof procedureSchema>;
