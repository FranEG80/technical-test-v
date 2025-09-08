import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface TipsCardProps {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function TipsCard({ card }: { card: TipsCardProps }) {
    const { title, description, icon: IconCard } = card;
    return (
        <li key={title} className="list-none flex ">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-base">{title}</CardTitle>
                    <IconCard className="h-5 w-5" aria-hidden="true" focusable="false" />
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    {description}
                </CardContent>
            </Card>
        </li>
    )
}