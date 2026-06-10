import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function BrandKitPage() {
  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-2xl font-extrabold tracking-[-0.04em] text-bright">
          Brand Kit
        </h1>
        <p className="mt-2 text-sm text-text-2">
          El contexto base de todo lo que Brievify genera para tu tienda.
        </p>
        <Card className="mt-8 p-8 text-center">
          <Badge variant="amber">Próximamente</Badge>
          <p className="mt-4 text-sm text-text-2">
            La edición del brand kit (logo, colores, tipografía, tono y estilo
            visual) se implementa en el paso 5 del plan, junto con Supabase
            Storage.
          </p>
        </Card>
      </div>
    </div>
  );
}
