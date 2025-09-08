import { cn } from "@/lib/utils";

export default function Title({ children, className }: { children: React.ReactNode, className?:string }) {
  return (
    <h1 className={cn("text-6xl font-medium md:text-6xl md:font-medium", className)}>{children}</h1>
  );
}
