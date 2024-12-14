import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import ProjectCard from "@/components/ProjectCard";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-500 text-gray-900">
      {/* Header */}
      <Header title="SSR & SSG Projects"/>

      {/* Introduction Section */}
      <Introduction />

      {/* Projects Section */}
      <section className="py-12">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Weather Forecast (SSR) Project Card */}
          <ProjectCard
            title="Weather Forecast (SSR)"
            description="Get real-time weather data using Server-Side Rendering. The page is dynamically rendered with live data based on location."
            link="/weather"
          />

          {/* GitHub Profile Viewer (SSG) Project Card */}
          <ProjectCard
            title="Product Listing (SSG)"
            description="View Products with Static Site Generation.Dynamic Product Data is fetched at build time for fast page loads and SEO optimization."
            link="/github-profile-viewer-ssg"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
