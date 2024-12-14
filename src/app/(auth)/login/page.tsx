"use server";
import { auth } from "@/auth";
import LoginForm from "@/components/client/LoginForm";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();
    if (session?.user) redirect("/");

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-purple-500 to-indigo-500 p-4">
            <Card className="w-full max-w-md bg-white rounded-xl shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold text-gray-800">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className="text-center">
                    <Link href="/signup" className="text-indigo-600 hover:underline text-md">
                        Don&apos;t have an account? Sign Up
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
