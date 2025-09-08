import { cn } from "@/lib/utils";

export default function DashedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn(`min-w-screen py-10 bg-main  outline-dashed outline-gray-300 outline-t-1 ${className}`)}>
      <div className="container mx-auto">
        {children}
      </div>
    </section>
  );
}