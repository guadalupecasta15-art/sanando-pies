"use server";

import { createClient } from "@/lib/supabase/server";

export interface AppointmentRequestInput {
  fullName: string;
  phone: string;
  email: string;
  reason: string;
  comments?: string;
}

export interface ActionResult {
  success: boolean;
  message: string;
}

/**
 * Guarda una solicitud de cita pública en la tabla `appointment_requests` de Supabase.
 * No crea ninguna cuenta de usuario: el paciente no tiene acceso al sistema.
 * Se activa por completo en la Etapa 4 (Integración con Supabase); mientras tanto
 * valida y responde de forma controlada si las variables de entorno no están configuradas.
 */
export async function submitAppointmentRequest(
  input: AppointmentRequestInput
): Promise<ActionResult> {
  if (!input.fullName || !input.phone || !input.email || !input.reason) {
    return { success: false, message: "Por favor completa todos los campos requeridos." };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // Etapa 1-3: Supabase aún no está conectado.
    console.log("[appointment_requests] (modo demo, sin Supabase):", input);
    return {
      success: true,
      message: "Solicitud recibida. Nos pondremos en contacto contigo pronto.",
    };
  }

 const supabase = await createClient();
  const { error } = await supabase.from("appointment_requests").insert({
    full_name: input.fullName,
    phone: input.phone,
    email: input.email,
    reason: input.reason,
    comments: input.comments ?? null,
    handled: false,
  });

  if (error) {
    console.error(error);
    return {
      success: false,
      message: "No pudimos enviar tu solicitud. Intenta nuevamente o contáctanos por WhatsApp.",
    };
  }

  return {
    success: true,
    message: "Solicitud recibida. Nos pondremos en contacto contigo pronto.",
  };
}
