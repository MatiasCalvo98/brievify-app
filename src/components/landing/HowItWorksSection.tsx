import { Palette, MessageSquareText, Rocket } from "lucide-react";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    icon: Palette,
    step: "01",
    title: "Cargas tu brand kit",
    description:
      "Logo, colores, tipografía y la descripción de tu negocio. Brievify entiende tu marca antes de construir nada.",
  },
  {
    icon: MessageSquareText,
    step: "02",
    title: "Describes por chat",
    description:
      '"Quiero una home minimal para mi tienda de ropa deportiva." Brievify construye con secciones de alta conversión.',
  },
  {
    icon: Rocket,
    step: "03",
    title: "Preview y publicas",
    description:
      "Ves la página crecer en vivo, ajustas lo que quieras y publicas a Shopify con un clic. Nada se aplica sin tu aprobación.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-bright md:text-5xl">
          Tres pasos. Cero código.
        </h2>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map(({ icon: Icon, step, title, description }) => (
          <Card key={step} interactive className="p-8">
            <div className="flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-lg bg-lime-surf text-lime">
                <Icon size={22} />
              </span>
              <span className="font-heading text-sm font-bold text-muted">
                {step}
              </span>
            </div>
            <h3 className="mt-6 font-heading text-xl font-bold text-bright">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-2">
              {description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
