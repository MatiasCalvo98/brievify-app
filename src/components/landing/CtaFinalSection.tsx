import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CtaFinalSection() {
  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden px-6 pb-24">
      <div className="relative overflow-hidden rounded-2xl border border-lime/20 bg-lime-surf px-8 py-20 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(184,239,53,0.08) 0%, transparent 60%)",
          }}
        />
        <p className="relative font-display text-2xl italic text-text-2">
          Brief it. Build it. Sell it.
        </p>
        <h2 className="relative mx-auto mt-4 max-w-2xl font-heading text-3xl font-extrabold tracking-[-0.04em] text-bright md:text-5xl">
          Tu tienda merece convertir mejor
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-text-2">
          Carga tu brand kit y construye tu primera página hoy. Sin tarjeta,
          sin compromiso.
        </p>
        <div className="relative mt-8">
          <Link href="/dashboard">
            <Button size="lg">Empezar gratis</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
