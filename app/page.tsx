import Technologies from "./(pages)/(home)/_components/technologies";
import Tips from "./(pages)/(home)/_components/tips";
import Header from "../components/header";
import Hero from "./(pages)/(home)/_components/hero";
import { technologies, cards } from "./(pages)/(home)/const";
import Section from "./(pages)/(home)/_components/section";

export default function Home() {
  
  return (
    <div className="flex flex-col items-center h-full w-full">
      <Header />
      <main className={`mt-28 flex  flex-col items-center sm:items-start`}>
        <Hero/>
        <Section>
          <Technologies technologies={technologies} />
        </Section>
        <Section>
          <Tips cards={cards} />
        </Section>
      </main>
      {/* <footer className="w-screen bg-main flex gap-[24px] flex-wrap items-center justify-center  mt-auto">
          <DashedContainer className="h-full w-full py-10 ">
            <div className="container mx-auto">
              asdf
            </div>
          </DashedContainer>
      </footer> */}
    </div>
  );
}
