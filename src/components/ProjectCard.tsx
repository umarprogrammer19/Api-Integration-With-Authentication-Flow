import Link from "next/link";

interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
}

const ProjectCard = ({ title, description, link }: ProjectCardProps) => {
    return (
        <div className="bg-gray-200 rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-700">{title}</h3>
                <p className="text-zinc-900 mb-4">{description}</p>
                <Link
                    href={link}
                    className="text-white bg-indigo-900 hover:bg-indigo-600 py-2 px-5 rounded-lg inline-block transition font-bold"
                >
                    View
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
