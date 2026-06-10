const metrics = [
  { value: "+120", label: "Tiendas construidas" },
  { value: "+18%", label: "Conversión promedio" },
  { value: "8 min", label: "De brief a preview" },
  { value: "0", label: "Líneas de código" },
];

const stores = ["NORDIKA", "VELA & CO", "MUNDO FIT", "CASA TERRA", "LUMA"];

export function SocialProofSection() {
  return (
    <section className="border-y border-border bg-surface/40 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center font-heading text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Tiendas que ya construyen con Brievify
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {stores.map((store) => (
            <span
              key={store}
              className="font-heading text-lg font-bold tracking-[0.1em] text-muted"
            >
              {store}
            </span>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading text-4xl font-extrabold tracking-[-0.04em] text-lime">
                {value}
              </p>
              <p className="mt-2 text-sm text-text-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
