"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface AppointmentFormResult {
  success: boolean;
  message?: string;
}

export async function createAppointment(formData: FormData): Promise<AppointmentFormResult> {
  const patientId = String(formData.get("patientId") ?? "");
  const specialistId = String(formData.get("specialistId") ?? "");
  const serviceId = String(formData.get("serviceId") ?? "");
  const roomId = String(formData.get("roomId") ?? "");
  const appointmentDate = String(formData.get("appointmentDate") ?? "");
  const startTime = String(formData.get("startTime") ?? "");
  const durationMinutes = Number(formData.get("durationMinutes") ?? 30);

  if (!patientId || !specialistId || !serviceId || !appointmentDate || !startTime) {
    return { success: false, message: "Completa todos los campos obligatorios." };
  }

  const [hours, minutes] = startTime.split(":").map(Number);
  const startDate = new Date(2000, 0, 1, hours, minutes);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  const endTime = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;

  const supabase = await createClient();
  const { error } = await supabase.from("appointments").insert({
    patient_id: patientId,
    specialist_id: specialistId,
    service_id: serviceId,
    room_id: roomId || null,
    appointment_date: appointmentDate,
    start_time: startTime,
    end_time: endTime,
    status: "confirmada",
  });

  if (error) {
    return { success: false, message: "No se pudo guardar la cita. Intenta de nuevo." };
  }

  revalidatePath("/agenda");
  revalidatePath("/dashboard");

  return { success: true };
}