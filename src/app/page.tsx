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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      {/* Introduction Section */}
      <Introduction />

      {/* Projects Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Weather Forecast (SSR) Project Card */}
          <ProjectCard
            title="Weather Forecast (SSR)"
            description="Get real-time weather data using Server-Side Rendering. The page is dynamically rendered with live data based on location."
            link="/weather-forecast-ssr"
          />

          {/* GitHub Profile Viewer (SSG) Project Card */}
          <ProjectCard
            title="GitHub Profile Viewer (SSG)"
            description="View GitHub profiles and repositories with Static Site Generation. Data is fetched at build time for fast page loads and SEO optimization."
            link="/github-profile-viewer-ssg"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
