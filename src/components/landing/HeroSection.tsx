import Link from "next/link";
import { Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

function FloatingCard({
  className,
  icon,
  label,
  value,
}: {
  className?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`absolute hidden items-center gap-3 rounded-xl border border-lime/20 bg-lime-surf/90 px-4 py-3 backdrop-blur-sm lg:flex ${className}`}
    >
      <span className="text-lime">{icon}</span>
      <div>
        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-text-2">
          {label}
        </p>
        <p className="font-heading text-sm font-bold text-bright">{value}</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28">
      {/* Grid de líneas sutiles */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)",
        }}
      />
      {/* Radial glow lima top-right */}
      <div
        className="pointer-events-none absolute -top-32 right-0 h-[640px] w-[640px]"
        style={{
          background:
            "radial-gradient(circle, rgba(184,239,53,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <FloatingCard
          className="left-2 top-32 -rotate-3 animate-fade-up [animation-delay:600ms]"
          icon={<ShieldCheck size={18} />}
          label="Sección generada"
          value="Trust badges aplicados"
        />
        <FloatingCard
          className="right-2 top-44 rotate-2 animate-fade-up [animation-delay:750ms]"
          icon={<TrendingUp size={18} />}
          label="Estimación"
          value="Conversión +18%"
        />
        <FloatingCard
          className="bottom-4 right-16 -rotate-1 animate-fade-up [animation-delay:900ms]"
          icon={<Sparkles size={18} />}
          label="Asset creado"
          value="Banner Hot Sale listo"
        />

        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime-surf px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            <Sparkles size={13} />
            El v0 para tiendas Shopify
          </span>
        </div>

        <h1 className="mx-auto mt-8 max-w-4xl animate-fade-up font-heading text-5xl font-extrabold tracking-[-0.04em] text-bright [animation-delay:100ms] md:text-7xl">
          Tu tienda Shopify, construida <span className="text-lime">por chat</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg text-text-2 [animation-delay:200ms] md:text-xl">
          Describes tu tienda. Brievify la construye con las mejores prácticas
          de conversión. Tú apruebas antes de publicar. Sin código, sin
          diseñador, sin consultor CRO.
        </p>

        <p className="mt-5 animate-fade-up font-display text-2xl italic text-text-2 [animation-delay:300ms]">
          Brief it. Build it. Sell it.
        </p>

        <div className="mt-10 flex animate-fade-up items-center justify-center gap-5 [animation-delay:400ms]">
          <Link href="/sign-up">
            <Button size="lg">Empezar gratis</Button>
          </Link>
          <Link
            href="#como-funciona"
            className="font-heading text-sm font-semibold text-text-2 transition-colors hover:text-text"
          >
            Ver cómo funciona →
          </Link>
        </div>
      </div>
    </section>
  );
}
