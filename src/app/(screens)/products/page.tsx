"use server";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function fetchProducts() {
    const response = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
}

export default async function Products() {
    const products = await fetchProducts();

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-500 text-gray-900 pb-10">
            {/* Header */}
            <Header title="SSG" />
            <header className="text-center py-8 text-white">
                <h1 className="text-4xl font-bold">Product Showcase</h1>
            </header>

            {/* Products Section */}
            <section className="py-12">
                <div className="max-w-screen-xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product: { image: string, title: string, price: number, id: number, description: string }) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                        >
                            {/* Product Image */}
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={500}
                                height={500}
                                className="h-40 w-full object-contain mb-4"
                            />

                            {/* Product Title */}
                            <h2 className="text-lg font-semibold mb-2">{product.title.slice(0, 20)}..</h2>

                            {/* Product Description */}
                            <p className="text-gray-600 text-sm line-clamp-2">
                                {product.description.slice(0, 20)}
                            </p>

                            {/* Product Price */}
                            <p className="text-xl font-bold text-indigo-600 mt-4">
                                ${product.price.toFixed(2)}
                            </p>

                            {/* View Details Button */}
                            <button className="mt-4 w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition">
                                <Link href={`/products/${product.id}`}>View Details</Link>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
