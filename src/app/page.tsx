import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { connectToDatabase } from "@/lib/utils";
import { User } from "@/models/userModels";
import { hash } from "bcryptjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const signUp = async (formData: FormData) => {
    "use server";
    const name = formData.get('name') as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!name || !email || !password) {
      throw new Error("Please fill in all fields");
    }
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("Email already in use");
    }
    const hashPassword = await hash(password, 10);
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    redirect("/login");
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-gray-900 dark:text-white">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signUp} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                Name
              </Label>
              <Input id="name" placeholder="Name" name="name" className="mt-1" />
            </div>
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
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-md text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};