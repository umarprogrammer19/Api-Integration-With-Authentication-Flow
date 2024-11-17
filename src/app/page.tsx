import { auth } from "@/auth";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
export default async function Home() {
  const cokess = cookies().get("authjs.session-token");
  console.log(await decode({
    token: cokess?.value,
    salt: cokess?.name!,
    secret: process.env.AUTH_SECRET!,
  }))
  return (
    <h1 className="text-center text-3xl underline mt-6">Authentication</h1>
  );
}
