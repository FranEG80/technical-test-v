import { cn } from "@/lib/utils";

export default function HeroSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("container flex flex-col gap-6 w-full mx-auto text-center sm:text-left bg-[url('/assets/images/vidext/corporative/logo.svg')] bg-size-[40%] bg-position-[left_2rem] bg-no-repeat justify-center", className)}>
      {children}
    </section>
  );
}