import { cn } from "@/lib/utils";

export default function DashedContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(`outline-dashed outline-1 outline-gray-300`, className)}>
      {children}
    </div>
  );
}