
"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { loginHandler } from "@/actions/login";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";

export default function LoginForm() {
    const router = useRouter();

    return (
        <>
            <form action={async (formData): Promise<any> => {
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
            }} className="space-y-4">
                <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Email
                    </Label>
                    <Input id="email" type="email" placeholder="Email" name="email" className="mt-1" />
                </div>
                <div>
                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                        Password
                    </Label>
                    <Input id="password" type="password" placeholder="Password" name="password" className="mt-1" />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
            </form>
        </>
    );
}
