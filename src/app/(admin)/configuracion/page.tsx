import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Configuración" };

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-display text-2xl font-semibold text-primary-900">Configuración</h1>
      <Card>
        <CardHeader><CardTitle>Datos de la clínica</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre de la clínica</Label>
            <Input id="name" defaultValue="Sanando Pies" />
          </div>
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" defaultValue="+52 33 5036 8101" />
          </div>
          <div>
            <Label htmlFor="address">Dirección</Label>
            <Input id="address" defaultValue="Av. del Pinar 3431, Pinar de la Calma, Zapopan, Jal." />
          </div>
          <Button>Guardar cambios</Button>
        </CardContent>
      </Card>
    </div>
  );
}
