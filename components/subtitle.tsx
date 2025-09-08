import { cn } from "@/lib/utils";

interface SubtitleProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

export default function Subtitle({ children, className, as: Component = "h2" }: SubtitleProps) {
    const textSizeClass = Component === "h2" ? "text-3xl" : "text-4xl";
    return <Component className={cn(textSizeClass, "font-light tracking-tight ", className)}>{children}</Component>;
}