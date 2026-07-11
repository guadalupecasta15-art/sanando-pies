"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AuthResult {
  success: boolean;
  message?: string;
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return {
      success: false,
      message:
        "Supabase aÃºn no estÃ¡ configurado (Etapa 4). Agrega tus variables de entorno para activar el login.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("SUPABASE_LOGIN_ERROR:", error.message, "| status:", error.status, "| code:", error.code);
    return { success: false, message: "Correo o contraseÃ±a incorrectos." };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

