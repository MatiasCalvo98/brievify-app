import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const steps = [
  { step: "1", title: "Brand Kit", description: "Logo, colores, tipografía, descripción y tono de tu marca." },
  { step: "2", title: "Style Quiz", description: "¿Qué tipo de diseño buscás? Minimal, moderno, elegante, bold, sobrio o cálido." },
  { step: "3", title: "Conectar Shopify", description: "OAuth con tu tienda para leer el tema y publicar páginas." },
];

export default function OnboardingPage() {
  return (
    <div className="flex h-full items-center justify-center overflow-y-auto p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-center font-heading text-3xl font-extrabold tracking-[-0.04em] text-bright">
          Bienvenido a Brievify
        </h1>
        <p className="mt-3 text-center text-sm text-text-2">
          Tres pasos y empezás a construir. El brand kit es el contexto base de
          todo — este onboarding no es salteable.
        </p>
        <div className="mt-10 flex flex-col gap-y-4">
          {steps.map(({ step, title, description }) => (
            <Card key={step} className="flex items-center gap-5 p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-lime-surf font-heading text-sm font-extrabold text-lime">
                {step}
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-bright">{title}</p>
                <p className="mt-1 text-xs text-text-2">{description}</p>
              </div>
              <Badge variant="amber" className="ml-auto shrink-0">
                Próximamente
              </Badge>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/dashboard">
            <Button>Ir al builder</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
