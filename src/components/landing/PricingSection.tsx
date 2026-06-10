import Link from "next/link";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const plans = [
  {
    name: "Starter",
    priceUsd: "Gratis",
    priceArs: "",
    description: "Para probar Brievify con tu tienda",
    features: [
      "1 página construida",
      "Brand kit completo",
      "Live preview",
      "Publicación a Shopify",
    ],
    cta: "Empezar gratis",
    highlighted: false,
  },
  {
    name: "Pro",
    priceUsd: "USD 29/mes",
    priceArs: "pago en ARS vía Mercado Pago",
    description: "Para tiendas que quieren crecer en serio",
    features: [
      "Páginas ilimitadas",
      "Todas las secciones CRO",
      "Campañas Hot Sale / CyberMonday",
      "Historial y borradores",
      "Soporte prioritario",
    ],
    cta: "Empezar con Pro",
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-bright md:text-5xl">
          Precio simple, sin sorpresas
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text-2">
          Menos de lo que cuesta una hora de un consultor. Cancelas cuando
          quieras.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative p-8 ${plan.highlighted ? "border-lime/30 bg-lime-surf" : ""}`}
          >
            {plan.highlighted && (
              <Badge variant="lime" className="absolute -top-3 left-8">
                Más popular
              </Badge>
            )}
            <h3 className="font-heading text-lg font-bold text-bright">
              {plan.name}
            </h3>
            <p className="mt-4 font-heading text-4xl font-extrabold tracking-[-0.04em] text-bright">
              {plan.priceUsd}
            </p>
            {plan.priceArs && (
              <p className="mt-1 text-xs text-text-2">{plan.priceArs}</p>
            )}
            <p className="mt-3 text-sm text-text-2">{plan.description}</p>
            <ul className="mt-7 flex flex-col gap-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-text"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-lime" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="mt-8 block">
              <Button
                variant={plan.highlighted ? "primary" : "secondary"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
