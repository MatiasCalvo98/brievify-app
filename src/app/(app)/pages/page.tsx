import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function PagesPage() {
  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-2xl font-extrabold tracking-[-0.04em] text-bright">
          Páginas
        </h1>
        <p className="mt-2 text-sm text-text-2">
          Historial de páginas y secciones construidas con Brievify.
        </p>
        <Card className="mt-8 p-8 text-center">
          <Badge variant="amber">Próximamente</Badge>
          <p className="mt-4 text-sm text-text-2">
            El historial con estados (publicado / borrador / descartado) se
            implementa cuando la tabla pages de Supabase esté conectada.
          </p>
        </Card>
      </div>
    </div>
  );
}
