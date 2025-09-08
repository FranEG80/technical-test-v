import HeroSection from "@/components/heroSection";
import Subtitle from "@/components/subtitle";
import Title from "@/components/title";
import HomeStyles from "../home.module.css"

export default function Hero() {
  return (
    <HeroSection className="h-[calc(100vh-7rem)] ">
      <div className=" max-w-5xl mx-auto flex flex-col gap-9 px-4">
        <Title className="text-center  mx-auto max-w-3xl text-balance">
          👋🏻 Welcome to Vidext ! Mini Editor with <span className={`${HomeStyles.stroked} uppercase text-transparent`}>tldraw</span>.
        </Title>
        <Subtitle className="text-center mx-auto max-w-5xl text-wrap text-gray-700">
          A technical test with a minimal drawing editor showcasing data fetching and persistence via{" "}<span className="text-foreground font-normal">Next.js</span>, <span className="text-foreground font-normal">TailwindCSS</span>, <span className="text-foreground font-normal">Shadcn UI</span>, and <span className="text-foreground font-normal">tRPC</span>.</Subtitle>
      </div>
    </HeroSection>
  );
}