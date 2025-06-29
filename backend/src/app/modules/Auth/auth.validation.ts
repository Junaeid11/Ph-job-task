import { z } from "zod";

const registerSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }).min(1, 'Name cannot be empty').max(50, 'Name cannot be more than 50 characters'),
        email: z.string({
            required_error: 'Email is required',
        }).email('Invalid email format'),
        password: z.string({
            required_error: 'Password is required',
        }).min(6, 'Password must be at least 6 characters'),
        photoURL: z.string().optional(),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }).email('Invalid email format'),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

export const AuthValidation = {
    registerSchema,
    loginSchema,
}; 