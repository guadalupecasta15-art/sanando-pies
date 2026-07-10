export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      appointment_requests: {
        Row: {
          comments: string | null
          created_at: string
          email: string
          full_name: string
          handled: boolean
          id: string
          phone: string
          reason: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          email: string
          full_name: string
          handled?: boolean
          id?: string
          phone: string
          reason: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          email?: string
          full_name?: string
          handled?: boolean
          id?: string
          phone?: string
          reason?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          archived_at: string | null
          created_at: string
          end_time: string
          id: string
          patient_id: string
          room_id: string | null
          service_id: string
          source_request_id: string | null
          specialist_id: string
          start_time: string
          status: string
        }
        Insert: {
          appointment_date: string
          archived_at?: string | null
          created_at?: string
          end_time: string
          id?: string
          patient_id: string
          room_id?: string | null
          service_id: string
          source_request_id?: string | null
          specialist_id: string
          start_time: string
          status?: string
        }
        Update: {
          appointment_date?: string
          archived_at?: string | null
          created_at?: string
          end_time?: string
          id?: string
          patient_id?: string
          room_id?: string | null
          service_id?: string
          source_request_id?: string | null
          specialist_id?: string
          start_time?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_source_request_id_fkey"
            columns: ["source_request_id"]
            isOneToOne: false
            referencedRelation: "appointment_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_movements: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          product_id: string
          quantity: number
          reason: string | null
          type: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          product_id: string
          quantity: number
          reason?: string | null
          type: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          product_id?: string
          quantity?: number
          reason?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_records: {
        Row: {
          allergies: string | null
          medical_history: string | null
          notes: string | null
          patient_id: string
          updated_at: string
        }
        Insert: {
          allergies?: string | null
          medical_history?: string | null
          notes?: string | null
          patient_id: string
          updated_at?: string
        }
        Update: {
          allergies?: string | null
          medical_history?: string | null
          notes?: string | null
          patient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: true
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          archived_at: string | null
          birth_date: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string
        }
        Insert: {
          archived_at?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          phone: string
        }
        Update: {
          archived_at?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          active: boolean
          cost: number
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          min_stock: number
          name: string
          price: number
          stock: number
        }
        Insert: {
          active?: boolean
          cost?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          min_stock?: number
          name: string
          price?: number
          stock?: number
        }
        Update: {
          active?: boolean
          cost?: number
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          min_stock?: number
          name?: string
          price?: number
          stock?: number
        }
        Relationships: []
      }
      promotions: {
        Row: {
          active: boolean
          description: string | null
          ends_at: string | null
          id: string
          starts_at: string | null
          title: string
        }
        Insert: {
          active?: boolean
          description?: string | null
          ends_at?: string | null
          id?: string
          starts_at?: string | null
          title: string
        }
        Update: {
          active?: boolean
          description?: string | null
          ends_at?: string | null
          id?: string
          starts_at?: string | null
          title?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          active: boolean
          id: string
          name: string
        }
        Insert: {
          active?: boolean
          id?: string
          name: string
        }
        Update: {
          active?: boolean
          id?: string
          name?: string
        }
        Relationships: []
      }
      sale_items: {
        Row: {
          id: string
          product_id: string | null
          quantity: number
          sale_id: string
          unit_price: number
        }
        Insert: {
          id?: string
          product_id?: string | null
          quantity?: number
          sale_id: string
          unit_price: number
        }
        Update: {
          id?: string
          product_id?: string | null
          quantity?: number
          sale_id?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          created_at: string
          id: string
          patient_id: string | null
          payment_method: string | null
          total: number
        }
        Insert: {
          created_at?: string
          id?: string
          patient_id?: string | null
          payment_method?: string | null
          total?: number
        }
        Update: {
          created_at?: string
          id?: string
          patient_id?: string | null
          payment_method?: string | null
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "sales_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          duration_minutes: number
          icon: string | null
          id: string
          name: string
          price: number
          slug: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          duration_minutes?: number
          icon?: string | null
          id?: string
          name: string
          price?: number
          slug: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          duration_minutes?: number
          icon?: string | null
          id?: string
          name?: string
          price?: number
          slug?: string
        }
        Relationships: []
      }
      specialists: {
        Row: {
          active: boolean
          bio: string | null
          created_at: string
          experience_years: number
          full_name: string
          id: string
          photo_url: string | null
          specialty: string
          staff_id: string | null
        }
        Insert: {
          active?: boolean
          bio?: string | null
          created_at?: string
          experience_years?: number
          full_name: string
          id?: string
          photo_url?: string | null
          specialty: string
          staff_id?: string | null
        }
        Update: {
          active?: boolean
          bio?: string | null
          created_at?: string
          experience_years?: number
          full_name?: string
          id?: string
          photo_url?: string | null
          specialty?: string
          staff_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "specialists_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      staff: {
        Row: {
          active: boolean
          created_at: string
          full_name: string
          id: string
          photo_url: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          full_name: string
          id?: string
          photo_url?: string | null
          role: string
          user_id?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          full_name?: string
          id?: string
          photo_url?: string | null
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          comment: string
          created_at: string
          id: string
          patient_name: string
          published: boolean
          rating: number
          treatment: string | null
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          patient_name: string
          published?: boolean
          rating: number
          treatment?: string | null
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          patient_name?: string
          published?: boolean
          rating?: number
          treatment?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
