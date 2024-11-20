import { auth } from "@/auth";
import Header from "@/components/Header";
import WeatherWidget from "@/components/weather-widget";
import { redirect } from "next/navigation";

export default async function Weather() {
    const session = await auth();
    if (!session?.user) redirect("/login");
    return (
        <>
            <WeatherWidget />
        </>
    )
}