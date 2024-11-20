const Introduction = () => {
    return (
        <section className="py-12  mx-4 my-8">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-semibold mb-6">What are SSR and SSG?</h2>
                <p className="text-[20px] mb-4">
                    <strong>Server-Side Rendering (SSR)</strong> dynamically renders pages
                    on the server for each request, making it ideal for real-time data and
                    personalized content.
                </p>
                <p className="text-[20px] mb-4">
                    <strong>Static Site Generation (SSG)</strong> pre-renders the pages at
                    build time, meaning the pages are generated ahead of time and served
                    as static HTML. This method is great for fast loading and SEO
                    optimization.
                </p>
            </div>
        </section>
    );
};

export default Introduction;
