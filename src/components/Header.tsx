"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const Header = () => {

    return (
        <header className="bg-blue-900 text-white py-6">
            <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
                <h1 className="text-[32px] font-bold text-center">SSR & SSG Projects</h1>
                <Button
                    onClick={async () => { await signOut() }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
                >
                    Logout
                </Button>
            </div>
        </header>
    )
}

export default Header;
