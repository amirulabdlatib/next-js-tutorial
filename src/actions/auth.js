"use server";

import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { getCollection } from "@/lib/db.js";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";

export async function register(state, formData) {
    const validatedFields = RegisterFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            email: formData.get("email"),
        };
    }

    const { email, password } = validatedFields.data;
    const userCollection = await getCollection("users");

    if (!userCollection) {
        return { errors: { email: "Server error!" } };
    }

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
        return { errors: { email: "Email already exists!" } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const results = await userCollection.insertOne({ email, password: hashedPassword });

    // create sessions
    await createSession(results.insertedId.toString());

    redirect("/dashboard");
}

export async function login(state, formData) {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            email: formData.get("email"),
        };
    }

    const { email, password } = validatedFields.data;

    const userCollection = await getCollection("users");

    if (!userCollection) {
        return { errors: { email: "Server error!" } };
    }

    const existingUser = await userCollection.findOne({ email });

    if (!existingUser) {
        return { errors: { email: "Invalid credentials" } };
    }

    const matchedPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchedPassword) {
        return { errors: { email: "Invalid credentials" } };
    }

    await createSession(existingUser._id.toString());

    redirect("/dashboard");
}
