import { Logo } from "@/components/brand/Logo";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4">
      {/* Radial glow lima */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(184,239,53,0.05) 0%, transparent 65%)",
        }}
      />
      {/* Grid de líneas */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 0%, black 30%, transparent 80%)",
        }}
      />
      <div className="relative flex w-full max-w-md flex-col items-center gap-8">
        <Logo href="/" />
        {children}
      </div>
    </div>
  );
}
