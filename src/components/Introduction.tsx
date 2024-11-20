const Introduction = () => {
    return (
        <section className="pt-12 mx-4 mt-6">
            <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 text-center">
                {/* SSR Card */}
                <div className="bg-gray-200 rounded-xl shadow-md overflow-hidden border border-gray-200 p-6">
                    <h3 className="text-xl font-bold mb-4 text-purple-700">
                        What is SSR?
                    </h3>
                    <p className="text-zinc-900">
                        <strong>Server-Side Rendering (SSR)</strong> dynamically renders
                        pages on the server for each request, making it ideal for
                        real-time data and personalized content.
                    </p>
                </div>

                {/* SSG Card */}
                <div className="bg-gray-200 rounded-xl shadow-md overflow-hidden border border-gray-200 p-6">
                    <h3 className="text-xl font-bold mb-4 text-purple-700">
                        What is SSG?
                    </h3>
                    <p className="text-zinc-900">
                        <strong>Static Site Generation (SSG)</strong> pre-renders the
                        pages at build time, meaning the pages are generated ahead of
                        time and served as static HTML. This method is great for fast
                        loading and SEO optimization.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Introduction;
