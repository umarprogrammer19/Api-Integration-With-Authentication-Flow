"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpHandler } from "@/actions/signup";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const router = useRouter();

    const handleSubmit = async (formData: FormData): Promise<any> => {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!name || !email || !password) {
            return toast.error("All fields are required.");
        }

        const toastId = toast.loading("Creating account...");

        try {
            const error = await signUpHandler(name, email, password);

            if (!error) {
                toast.success("Account created successfully!", { id: toastId });
                router.push("/login"); // Redirect to login
            } else {
                toast.error(error, { id: toastId });
            }
        } catch (err) {
            console.error("Error during sign-up:", err);
            toast.error("An error occurred. Please try again.", { id: toastId });
        }
    };

    return (
        <form
            action={handleSubmit}
            className="flex flex-col gap-4"
        >
            <Input
                placeholder="Name"
                name="name"
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <Input
                type="email"
                placeholder="Email"
                name="email"
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <Input
                type="password"
                placeholder="Password"
                name="password"
                className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
            >
                Sign Up
            </Button>
        </form>
    );
}
