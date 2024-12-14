import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

// Fetch product details based on ID
async function fetchProduct(id: string) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch product details");
    }
    return response.json();
}

// Generate static params (replaces `getStaticPaths`)
export async function generateStaticParams() {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    return products.map((product: { id: number }) => ({
        id: product.id.toString(),
    }));
}

// Product Page Component
export default async function ProductPage({ params }: { params: { id: string } }) {
    try {
        const product = await fetchProduct(params.id);

        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-500 text-gray-900 pb-10">
                {/* Header */}
                <Header title={product.title} />

                {/* Product Details */}
                <div className="max-w-screen-lg mx-auto px-4 py-12 bg-white rounded-md shadow-md">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Product Image */}
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={1000}
                            height={1000}
                            className="w-full md:w-1/2 h-auto object-contain"
                        />

                        {/* Product Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            <p className="text-2xl font-bold text-indigo-600 mb-6">
                                ${product.price.toFixed(2)}
                            </p>
                            <button className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        );
    } catch (error) {
        return <div>Failed to load product details.{error as string}</div>;
    }
}
