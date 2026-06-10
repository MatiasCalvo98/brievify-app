import {
  MessageSquareText,
  Eye,
  LayoutTemplate,
  Palette,
  ShieldCheck,
  Megaphone,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    icon: MessageSquareText,
    title: "Builder por chat",
    description:
      "Describes lo que quieres en lenguaje natural. Brievify construye páginas completas: home, landings, producto, colección.",
    span: "md:col-span-2",
  },
  {
    icon: Eye,
    title: "Live preview en tiempo real",
    description:
      "Ves la página crecer sección a sección mientras el chat avanza. Lo que ves es lo que se publica.",
    span: "",
  },
  {
    icon: LayoutTemplate,
    title: "Secciones que convierten",
    description:
      "No es un canvas en blanco: cada sección viene con principios CRO incorporados — trust signals, urgencia genuina, CTAs sobre el fold.",
    span: "",
  },
  {
    icon: Palette,
    title: "Tu marca, siempre",
    description:
      "El brand kit (logo, colores, tipografía, tono) es el contexto base de todo lo que se genera.",
    span: "",
  },
  {
    icon: ShieldCheck,
    title: "Tú apruebas antes de publicar",
    description:
      "Ningún cambio toca tu tienda real sin tu aprobación explícita. Preview primero, siempre.",
    span: "",
  },
  {
    icon: Megaphone,
    title: "Listo para LATAM",
    description:
      "Hot Sale, CyberMonday, Día de la Madre. Campañas pensadas para el calendario de e-commerce de la región, en tu idioma.",
    span: "md:col-span-2",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-extrabold tracking-[-0.04em] text-bright md:text-5xl">
          Un equipo completo, <span className="text-lime">en una herramienta</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-text-2">
          Diseñador, desarrollador, redactor y consultor CRO. Todo lo que antes
          necesitabas contratar, ahora lo describes por chat.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description, span }) => (
          <Card key={title} interactive className={`p-7 ${span}`}>
            <span className="flex size-10 items-center justify-center rounded-lg bg-lime-surf text-lime">
              <Icon size={20} />
            </span>
            <h3 className="mt-5 font-heading text-lg font-bold text-bright">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-2">
              {description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
