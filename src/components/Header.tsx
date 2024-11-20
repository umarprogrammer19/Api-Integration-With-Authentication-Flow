"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Header = (props: { title: string, customClass?: string }) => {
    return (
        <header className={`text-gray-200 py-6 rounded-b-lg ${props.customClass}`}>
            <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
                <h1 className="text-[32px] font-bold text-center">{props.title}</h1>
                <Button
                    onClick={async () => {
                        const toastId = toast.loading("Logging Out .....");
                        await signOut();
                        toast.success("Logged out successfully", { id: toastId });
                    }}
                    className="bg-gray-200 text-purple-700 hover:text-white hover:bg-purple-700 px-4 py-2 rounded-lg transition"
                >
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default Header;
