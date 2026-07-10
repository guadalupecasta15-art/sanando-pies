/**
 * Tipos generados manualmente a partir de supabase/schema.sql
 * Reemplaza este archivo cuando corras:
 *   npx supabase gen types typescript --project-id TU_PROYECTO --schema public > src/types/database.types.ts
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
    Tables: {
      staff: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          role: "admin" | "especialista" | "recepcion";
          photo_url: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["staff"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["staff"]["Row"]>;
      };
      specialists: {
        Row: {
          id: string;
          staff_id: string | null;
          full_name: string;
          specialty: string;
          experience_years: number;
          photo_url: string | null;
          bio: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["specialists"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["specialists"]["Row"]>;
      };
      services: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          duration_minutes: number;
          price: number;
          icon: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
      };
      patients: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          birth_date: string | null;
          created_at: string;
          archived_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["patients"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["patients"]["Row"]>;
      };
      patient_records: {
        Row: {
          patient_id: string;
          medical_history: string | null;
          allergies: string | null;
          notes: string | null;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["patient_records"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["patient_records"]["Row"]>;
      };
      appointment_requests: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string;
          reason: string;
          comments: string | null;
          handled: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["appointment_requests"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["appointment_requests"]["Row"]>;
      };
      rooms: {
        Row: {
          id: string;
          name: string;
          active: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["rooms"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["rooms"]["Row"]>;
      };
      appointments: {
        Row: {
          id: string;
          patient_id: string;
          specialist_id: string;
          service_id: string;
          room_id: string | null;
          appointment_date: string;
          start_time: string;
          end_time: string;
          status:
            | "pendiente"
            | "confirmada"
            | "en_consulta"
            | "finalizada"
            | "cancelada";
          source_request_id: string | null;
          created_at: string;
          archived_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["appointments"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["appointments"]["Row"]>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          cost: number;
          stock: number;
          min_stock: number;
          image_url: string | null;
          active: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["products"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
      };
      inventory_movements: {
        Row: {
          id: string;
          product_id: string;
          type: "entrada" | "salida" | "ajuste";
          quantity: number;
          reason: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["inventory_movements"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["inventory_movements"]["Row"]>;
      };
      sales: {
        Row: {
          id: string;
          patient_id: string | null;
          total: number;
          payment_method: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["sales"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["sales"]["Row"]>;
      };
      sale_items: {
        Row: {
          id: string;
          sale_id: string;
          product_id: string | null;
          quantity: number;
          unit_price: number;
        };
        Insert: Partial<Database["public"]["Tables"]["sale_items"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["sale_items"]["Row"]>;
      };
      testimonials: {
        Row: {
          id: string;
          patient_name: string;
          rating: number;
          comment: string;
          treatment: string | null;
          published: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
      };
      promotions: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          starts_at: string | null;
          ends_at: string | null;
          active: boolean;
        };
        Insert: Partial<Database["public"]["Tables"]["promotions"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["promotions"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
