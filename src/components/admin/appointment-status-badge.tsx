import { Badge } from "@/components/ui/badge";
import type { AppointmentStatus } from "@/types/domain";

const labels: Record<AppointmentStatus, string> = {
  pendiente: "Pendiente",
  confirmada: "Confirmada",
  en_consulta: "En consulta",
  finalizada: "Finalizada",
  cancelada: "Cancelada",
};

export function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
  return <Badge variant={status}>{labels[status]}</Badge>;
}
