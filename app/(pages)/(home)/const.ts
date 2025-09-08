import { Rocket, Shapes, ShieldCheck } from "lucide-react"

export const technologies = [
  { name: "Next.js", href: "https://nextjs.org/", icon: "nextjs.svg" },
  { name: "TailwindCSS", href: "https://tailwindcss.com/", icon: "tailwindcss.svg" },
  { name: "Shadcn UI", href: "https://ui.shadcn.com/", icon: "shadcn-ui.svg" },
  { name: "tRPC", href: "https://trpc.io/", icon: "trpc.svg" },
  { name: "tldraw", href: "https://tldraw.com/", icon: "tldraw.svg" },
]

export const cards = [
  {
    title: "Create & Edit Shapes",
    description: "Draw, select, and modify shapes. Includes a sample button to programmatically update a shape.",
    icon: Shapes,
  },
  {
    title: "Type-safe APIs",
    description: "Data is loaded and saved via Next.js routes wired through tRPC, with proper loading & error states.",
    icon: ShieldCheck,
  },
  {
    title: "Good DX & UI",
    description: "Styled with TailwindCSS and Shadcn UI components to keep things clean and consistent.",
    icon: Rocket,
  },
]
