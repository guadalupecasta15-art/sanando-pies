"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface RequestActionResult {
  success: boolean;
  message?: string;
}

export async function convertRequestToAppointment(formData: FormData): Promise<RequestActionResult> {
  const requestId = String(formData.get("requestId") ?? "");
  const fullName = String(formData.get("fullName") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const email = String(formData.get("email") ?? "");
  const specialistId = String(formData.get("specialistId") ?? "");
  const serviceId = String(formData.get("serviceId") ?? "");
  const roomId = String(formData.get("roomId") ?? "");
  const appointmentDate = String(formData.get("appointmentDate") ?? "");
  const startTime = String(formData.get("startTime") ?? "");
  const durationMinutes = Number(formData.get("durationMinutes") ?? 30);

  if (!requestId || !specialistId || !serviceId || !appointmentDate || !startTime) {
    return { success: false, message: "Completa todos los campos obligatorios." };
  }

  const supabase = await createClient();

  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .insert({ full_name: fullName, phone, email: email || null })
    .select("id")
    .single();

  if (patientError || !patient) {
    return { success: false, message: "No se pudo crear el paciente." };
  }

  const [hours, minutes] = startTime.split(":").map(Number);
  const startDate = new Date(2000, 0, 1, hours, minutes);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
  const endTime = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;

  const { error: apptError } = await supabase.from("appointments").insert({
    patient_id: patient.id,
    specialist_id: specialistId,
    service_id: serviceId,
    room_id: roomId || null,
    appointment_date: appointmentDate,
    start_time: startTime,
    end_time: endTime,
    status: "confirmada",
    source_request_id: requestId,
  });

  if (apptError) {
    return { success: false, message: "No se pudo crear la cita." };
  }

  await supabase.from("appointment_requests").update({ handled: true }).eq("id", requestId);

  revalidatePath("/reportes");
  revalidatePath("/agenda");
  revalidatePath("/dashboard");
  revalidatePath("/pacientes");

  return { success: true };
}

export async function dismissRequest(requestId: string): Promise<RequestActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("appointment_requests").update({ handled: true }).eq("id", requestId);

  if (error) {
    return { success: false, message: "No se pudo actualizar la solicitud." };
  }

  revalidatePath("/reportes");
  return { success: true };
}