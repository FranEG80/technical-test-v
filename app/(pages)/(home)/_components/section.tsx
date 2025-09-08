export default function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section  className={`min-w-screen bg-main w-full ${className ?? ""}`}>
      {children}
    </section>
  );
}