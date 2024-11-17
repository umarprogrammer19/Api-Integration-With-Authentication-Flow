"use server";

import { connectToDatabase } from "@/lib/utils";
import { User } from "@/models/userModels";
import { hash } from "bcryptjs";

export const signUpHandler = async (name: string, email: string, password: string): Promise<string | null> => {
    if (!name || !email || !password) {
        return "All fields are required.";
    }

    try {
        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return "Email already in use.";
        }

        const hashedPassword = await hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return null; // Success
    } catch (error) {
        console.error("Sign-up error:", error);
        return "An unexpected error occurred. Please try again later.";
    }
};
