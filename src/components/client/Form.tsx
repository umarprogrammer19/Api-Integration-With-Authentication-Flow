"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { loginHandler } from "@/actions/login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    return (
        <>
            <form
                action={async (formData): Promise<any> => {
                    const email = formData.get("email") as string;
                    const password = formData.get("password") as string;
                    if (!email || !password) return toast.error("Email and password are required");
                    const toastId = toast.loading("Logging in...");
                    try {
                        const error = await loginHandler(email, password);

                        if (!error) {
                            toast.success("Login successful", { id: toastId });
                            router.refresh();
                        } else if (error) {
                            toast.error("Invalid Credentials", { id: toastId });
                        }
                    } catch (err) {
                        console.error("Login error:", err);
                        toast.error("Something went wrong. Please try again.", { id: toastId });
                    }
                }}
                className="flex flex-col gap-4"
            >
                <Input type="email" placeholder="Email" name="email" />
                <Input type="password" placeholder="Password" name="password" />
                <Button type="submit">Login</Button>
            </form>
        </>
    );
}
