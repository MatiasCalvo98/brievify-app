const faqs = [
  {
    q: "¿Necesito saber programar?",
    a: "No. Describes lo que quieres en lenguaje natural y Brievify lo construye. Nunca vas a ver código, IDs de Shopify ni terminología técnica.",
  },
  {
    q: "¿Brievify puede romper mi tienda?",
    a: "No. Ningún cambio se aplica a tu tienda real sin que veas el preview y apruebes explícitamente con el botón Publicar. Es la regla de oro del producto.",
  },
  {
    q: "¿Funciona con mi tema actual?",
    a: "Sí. Brievify soporta cualquier tema de Shopify, incluyendo los gratuitos como Dawn o Debut.",
  },
  {
    q: "¿Qué hace diferente a Brievify de un page builder como Shogun?",
    a: "Brievify no es un canvas en blanco: ya sabe qué secciones convierten. Cada sección que genera tiene principios CRO incorporados — trust signals, urgencia genuina, CTAs bien ubicados.",
  },
  {
    q: "¿Cómo pago desde Argentina?",
    a: "Con Mercado Pago, en pesos. El precio en USD es solo referencia.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-center font-heading text-3xl font-extrabold tracking-[-0.04em] text-bright md:text-5xl">
        Preguntas frecuentes
      </h2>
      <div className="mt-12 flex flex-col gap-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-xl border border-border bg-surface transition-colors hover:border-border-2"
          >
            <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-heading text-sm font-bold text-bright [&::-webkit-details-marker]:hidden">
              {faq.q}
              <span className="ml-4 text-text-2 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-6 pb-5 text-sm leading-relaxed text-text-2">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
