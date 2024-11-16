import { auth } from "@/auth";
import LoginForm from "@/components/client/Form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();
    if (session?.user) redirect("/integration");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-gray-900 dark:text-white">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className="text-center">
                    <p className="text-md text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link href="/" className="text-indigo-600 hover:underline dark:text-indigo-400">
                            Sign Up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}