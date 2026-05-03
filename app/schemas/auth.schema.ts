import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "Username is required").min(3, "Username must be at least 3 characters"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters.")
})

export type LoginFormValues = z.infer<typeof loginSchema>;

export const createUserSchema = z.object({
    username: z.string().min(1, "Username is required").min(3, "Username must be at least 3 characters"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters."),
    role: z.enum(["SME_OWNER", "SME_STAFF"])
})

export type CreateUserFormValues = z.infer<typeof createUserSchema>;