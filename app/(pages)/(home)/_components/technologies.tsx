import DashedContainer from "@/components/dashedContainer";
import Subtitle from "@/components/subtitle";
import Image from "next/image";
import Link from "next/link";

interface TechnologiesProps {
    technologies: {
        name: string;
        href: string;
        icon: string;
    }[]
}

export default function Technologies({ technologies }: TechnologiesProps) {
    return (
        <>
            <div className=" w-full">
                <DashedContainer className="container mx-auto py-18 mt-[1px]">
                    <Subtitle as="h3" className=" mx-auto text-center font-medium">Technologies Used:</Subtitle>
                </DashedContainer>
            </div>
            <ul role="list" className="container mx-auto grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
                {technologies.map((tech) => (
                    <li key={tech.name}>
                        <DashedContainer className="flex flex-col items-center p-12 group">
                            <Image
                                src={`/assets/images/logos/${tech.icon}`}
                                alt={tech.name}
                                width={100}
                                height={100}
                                className="mb-2 group-hover:scale-110 transition-transform duration-300"
                            />
                            <Link 
                                href={tech.href} 
                                target="_blank" 
                                rel="noopener noreferrer" className="pt-6 text-center text-2xl font-medium  group-hover:scale-110 group-hover:underline transition-all duration-300"
                            >
                                {tech.name}
                            </Link>
                        </DashedContainer> 
                    </li>
                ))}
            </ul>
        </>
    )
}