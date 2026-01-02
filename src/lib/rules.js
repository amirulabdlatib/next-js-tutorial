import { email, z } from "zod/v4";

export const RegisterFormSchema = z
    .object({
        email: z.email({ message: "Please enter a valid email." }), // Note: .email() is now standalone
        password: z
            .string()
            .min(1, { message: "Not be empty" })
            .min(5, { message: "Be at least 5 characters long" })
            .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
            .regex(/[0-9]/, { message: "Contain at least one number." })
            .regex(/[^a-zA-Z0-9]/, {
                message: "Contain at least one special character.",
            }),
        confirmPassword: z.string(),
    })
    .refine((val) => val.password === val.confirmPassword, {
        message: "Password fields do not match.",
        path: ["confirmPassword"],
    });

export const LoginFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z.string().min(1, { message: "Password is required" }).trim(),
});
