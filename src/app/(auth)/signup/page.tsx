import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SignUpForm from "../../../components/client/SignUpForm";

export default function SignUpPage() {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-purple-500 to-indigo-500 p-4">
            <Card className="w-full max-w-md bg-white rounded-xl shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold text-gray-800">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
                <CardFooter className="text-center">
                    <Link href="/login" className="text-indigo-600 hover:underline text-md">
                        Already have an account? Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
