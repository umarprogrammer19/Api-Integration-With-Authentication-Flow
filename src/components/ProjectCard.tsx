import Link from 'next/link'

interface ProjectCardProps {
    title: string
    description: string
    link: string
}

const ProjectCard = ({ title, description, link }: ProjectCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-700 mb-4">{description}</p>
                <Link href={link} className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full inline-block">
                    View Project
                </Link>
            </div>
        </div>
    )
}

export default ProjectCard;
