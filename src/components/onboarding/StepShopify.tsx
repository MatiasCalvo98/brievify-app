"use client";

import { ShoppingBag, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function StepShopify() {
  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-lime-surf text-lime">
        <ShoppingBag size={30} />
      </span>
      <div>
        <div className="mb-3 flex justify-center">
          <Badge variant="amber">Próximamente</Badge>
        </div>
        <h3 className="font-heading text-lg font-bold text-bright">
          Conectá tu tienda Shopify
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-text-2">
          Pronto vas a poder conectar tu tienda para que Brievify lea tu tema y
          publique las páginas que construyas con un solo clic. Por ahora podés
          construir y previsualizar todo sin conectar nada.
        </p>
      </div>
      <ul className="flex flex-col gap-y-2 text-left">
        {[
          "Lee tu tema activo y tus productos",
          "Publica páginas directo a Shopify",
          "Nada se aplica sin tu aprobación",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-text-2">
            <Check size={15} className="shrink-0 text-lime" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
