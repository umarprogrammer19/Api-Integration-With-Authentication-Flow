"use client";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CloudIcon, MapPinIcon, ThermometerIcon } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import LoadingSpinner from "./loadingSpinner";
import Header from "./Header";
import Footer from "./Footer";

interface WeatherData {
    temperature: number;
    description: string;
    location: string;
    unit: string;
}

export default function WeatherWidget() {
    const [location, setLocation] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedLocation = location.trim();
        if (trimmedLocation === "") {
            setError("Please enter a valid location.");
            setWeather(null);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`
            );
            if (!response.ok) {
                throw new Error("City not found.");
            }
            const data = await response.json();
            const weatherData: WeatherData = {
                temperature: data.current.temp_c,
                description: data.current.condition.text,
                location: data.location.name,
                unit: "C",
            };
            setWeather(weatherData);
        } catch (error) {
            if (error instanceof TypeError) {
                setError("Network error. Please try again later.");
            } else {
                setError("City not found. Please try again.");
            }
            setWeather(null);
        } finally {
            setIsLoading(false);
        }
    };

    const getTemperatureMessage = (temperature: number, unit: string): string => {
        if (unit === "C") {
            if (temperature < 0) {
                return `It's freezing at ${temperature}°C! Bundle up!`;
            } else if (temperature < 10) {
                return `It's quite cold at ${temperature}°C. Wear warm clothes.`;
            } else if (temperature < 20) {
                return `The temperature is ${temperature}°C. Comfortable for a light jacket.`;
            } else if (temperature < 30) {
                return `It's a pleasant ${temperature}°C. Enjoy the nice weather!`;
            } else {
                return `It's hot at ${temperature}°C. Stay hydrated!`;
            }
        } else {
            return `${temperature}°${unit}`;
        }
    };

    function getWeatherMessage(description: string): string {
        switch (description.toLowerCase()) {
            case "sunny":
                return "It's a beautiful sunny day!";
            case "partly cloudy":
                return "Expect some clouds and sunshine.";
            case "cloudy":
                return "It's cloudy today.";
            case "overcast":
                return "The sky is overcast.";
            case "rain":
                return "Don't forget your umbrella! It's raining.";
            case "thunderstorm":
                return "Thunderstorms are expected today.";
            case "snow":
                return "Bundle up! It's snowing.";
            case "mist":
                return "It's misty outside.";
            case "fog":
                return "Be careful, there's fog outside.";
            default:
                return description; // Default to returning the description as-is
        }
    }

    function getLocationMessage(location: string): string {
        const currentHour = new Date().getHours();
        const isNight = currentHour >= 18 || currentHour < 6;
        return ` ${location} ${isNight ? "at Night" : "During the Day"}`;
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-purple-500 to-indigo-500">
            <Header title="Weather Widget" customClass="fixed top-0 w-[100vw]"/>
            <Card className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg text-gray-900">
                <CardHeader className="border-b border-gray-200">
                    <CardTitle className="text-2xl font-bold text-indigo-600">
                        Weather Widget
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Search for the current weather conditions in your city.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex items-center gap-3 mt-4">
                        <Input
                            type="text"
                            className="bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            placeholder="Enter a city name"
                            value={location}
                            disabled={isLoading}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setLocation(e.target.value.trim())
                            }
                        />
                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all ms-2"
                            disabled={isLoading}
                        >
                            {isLoading ? <LoadingSpinner /> : "Search"}
                        </Button>
                    </form>
                    {error && <div className="mt-4 text-red-500">{error}</div>}
                    {weather && (
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <ThermometerIcon className="w-6 h-6 text-indigo-600" />
                                {getTemperatureMessage(weather.temperature, weather.unit)}
                            </div>
                            <div className="flex items-center gap-2">
                                <CloudIcon className="w-6 h-6 text-indigo-600" />
                                <div>{getWeatherMessage(weather.description)}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="w-6 h-6 text-indigo-600" />
                                <div>{getLocationMessage(weather.location)}</div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
            <Footer customClass="fixed bottom-5"/>
        </div>
    );
}
