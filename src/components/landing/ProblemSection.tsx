import { X, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";

const before = [
  "Tema default que nunca tocaste",
  "Sin estructura de conversión",
  "Dependes de diseñador + dev + consultor",
  "Cada cambio tarda semanas y cuesta caro",
];

const after = [
  "Páginas con principios CRO incorporados",
  "Secciones que ya saben convertir",
  "Una sola herramienta, por chat",
  "Cambios en minutos, tú apruebas antes de publicar",
];

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-bright md:text-5xl">
          Tu tienda tiene un problema.
          <br />
          <span className="text-lime">Brievify lo resuelve en minutos.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-text-2">
          La mayoría de las tiendas Shopify usan diseños genéricos sin
          estructura de conversión. No por falta de visión — por falta de
          equipo.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <Card className="p-8">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Antes
          </p>
          <ul className="mt-6 flex flex-col gap-y-4">
            {before.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-2">
                <X size={18} className="mt-0.5 shrink-0 text-coral" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="border-lime/20 bg-lime-surf p-8">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-lime">
            Con Brievify
          </p>
          <ul className="mt-6 flex flex-col gap-y-4">
            {after.map((item) => (
              <li key={item} className="flex items-start gap-3 text-text">
                <Check size={18} className="mt-0.5 shrink-0 text-lime" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
