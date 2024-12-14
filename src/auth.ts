"use server";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "./models/userModels";
import { compare } from "bcryptjs";
import { connectToDatabase } from "./lib/utils";

// Centralized error messages
const ERROR_MESSAGES = {
    MISSING_CREDENTIALS: "Please provide both email and password.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    DATABASE_ERROR: "Database connection error.",
};

// Define reusable types
type Credentials = {
    email: string | undefined;
    password: string | undefined;
};

type UserObject = {
    name: string;
    email: string;
    id: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            /**
             * Authorize user with email and password.
             * @param credentials - User credentials containing email and password.
             * @returns Authenticated user object or null.
             */
            authorize: async (credentials): Promise<UserObject | null> => {
                const { email, password } = credentials as Credentials;

                if (!email || !password) {
                    throw new CredentialsSignin({
                        cause: ERROR_MESSAGES.MISSING_CREDENTIALS,
                    });
                }

                try {
                    // Connect to the database
                    await connectToDatabase();
                } catch (error) {
                    console.error("Database connection failed:", error);
                    throw new CredentialsSignin({
                        cause: ERROR_MESSAGES.DATABASE_ERROR,
                    });
                }

                // Fetch user from the database
                const user = await User.findOne({ email }).select("+password");

                // Validate user and password
                if (!user || !user.password) {
                    throw new CredentialsSignin({
                        cause: ERROR_MESSAGES.INVALID_CREDENTIALS,
                    });
                }

                const isMatch = await compare(password, user.password);

                if (!isMatch) {
                    throw new CredentialsSignin({
                        cause: ERROR_MESSAGES.INVALID_CREDENTIALS,
                    });
                }

                return { name: user.name, email: user.email, id: user._id };
            },
        }),
    ],
    pages: {
        signIn: "/login", // Custom sign-in page
    },
});
