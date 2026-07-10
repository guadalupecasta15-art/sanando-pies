/**
 * Este archivo se regenera automáticamente en la Etapa 4 con:
 *   npx supabase gen types typescript --project-id TU_PROYECTO --schema public > src/types/database.types.ts
 *
 * Mientras tanto, se define un tipo mínimo para que el resto del proyecto compile.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: Record<string, { Row: Record<string, unknown> }>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
