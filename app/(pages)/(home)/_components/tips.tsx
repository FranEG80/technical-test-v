import DashedContainer from "@/components/dashedContainer";
import TipsCard, { TipsCardProps } from "./tipsCard";
import Subtitle from "@/components/subtitle";

interface TipsProps {
  cards: TipsCardProps[];
}

export default function Tips({ cards }: TipsProps) {
  return (
    <DashedContainer className="container mx-auto">
        <DashedContainer className="">
            <Subtitle as="h3" className="font-medium text-center py-18">Key Features:</Subtitle>
            <ul role="list" className="container mx-auto grid gap-4 md:grid-cols-3 rounded-xl px-14 pb-12">
                {cards.map((card) => (
                    <TipsCard key={card.title} card={card} />
                ))}
            </ul>
        </DashedContainer>
    </DashedContainer>
  );
}