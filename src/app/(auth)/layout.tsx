import { Logo } from "@/components/brand/Logo";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      style={{ backgroundColor: "#07090A", minHeight: "100vh" }}
      className="relative flex items-center justify-center overflow-hidden px-4 py-12"
    >
      {/* Radial glow lima */}
      <div
        style={{
          position: "absolute",
          top: "-10rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(184,239,53,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      {/* Grid de líneas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          backgroundImage:
            "linear-gradient(to right, #1C2B1F 1px, transparent 1px), linear-gradient(to bottom, #1C2B1F 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 0%, black 30%, transparent 80%)",
          pointerEvents: "none",
        }}
      />
      <div className="relative flex w-full max-w-md flex-col items-center gap-8">
        <Logo href="/" />
        {children}
        <p style={{ color: "#456050", fontSize: "0.75rem" }}>
          Brief it. Build it. Sell it.
        </p>
      </div>
    </div>
  );
}
