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

interface StaffRow {
    id: string;
    user_id: string | null;
    full_name: string;
    role: "admin" | "especialista" | "recepcion";
    photo_url: string | null;
    active: boolean;
    created_at: string;
}

interface SpecialistsRow {
    id: string;
    staff_id: string | null;
    full_name: string;
    specialty: string;
    experience_years: number;
    photo_url: string | null;
    bio: string | null;
    active: boolean;
    created_at: string;
}

interface ServicesRow {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    duration_minutes: number;
    price: number;
    icon: string | null;
    active: boolean;
    created_at: string;
}

interface PatientsRow {
    id: string;
    full_name: string;
    phone: string;
    email: string | null;
    birth_date: string | null;
    created_at: string;
    archived_at: string | null;
}

interface PatientRecordsRow {
    patient_id: string;
    medical_history: string | null;
    allergies: string | null;
    notes: string | null;
    updated_at: string;
}

interface AppointmentRequestsRow {
    id: string;
    full_name: string;
    phone: string;
    email: string;
    reason: string;
    comments: string | null;
    handled: boolean;
    created_at: string;
}

interface RoomsRow {
    id: string;
    name: string;
    active: boolean;
}

interface AppointmentsRow {
    id: string;
    patient_id: string;
    specialist_id: string;
    service_id: string;
    room_id: string | null;
    appointment_date: string;
    start_time: string;
    end_time: string;
    status: "pendiente" | "confirmada" | "en_consulta" | "finalizada" | "cancelada";
    source_request_id: string | null;
    created_at: string;
    archived_at: string | null;
}

interface ProductsRow {
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
}

interface InventoryMovementsRow {
    id: string;
    product_id: string;
    type: "entrada" | "salida" | "ajuste";
    quantity: number;
    reason: string | null;
    created_by: string | null;
    created_at: string;
}

interface SalesRow {
    id: string;
    patient_id: string | null;
    total: number;
    payment_method: string | null;
    created_at: string;
}

interface SaleItemsRow {
    id: string;
    sale_id: string;
    product_id: string | null;
    quantity: number;
    unit_price: number;
}

interface TestimonialsRow {
    id: string;
    patient_name: string;
    rating: number;
    comment: string;
    treatment: string | null;
    published: boolean;
    created_at: string;
}

interface PromotionsRow {
    id: string;
    title: string;
    description: string | null;
    starts_at: string | null;
    ends_at: string | null;
    active: boolean;
}

export interface Database {
    public: {
          Tables: {
                  staff: {
                            Row: StaffRow;
                            Insert: Partial<StaffRow>;
                            Update: Partial<StaffRow>;
                            Relationships: [];
                  };
                  specialists: {
                    Row: SpecialistsRow;
                    Insert: Partial<SpecialistsRow>;
                    Update: Partial<SpecialistsRow>;
                    Relationships: [];
                  };
                  services: {
                    Row: ServicesRow;
                    Insert: Partial<ServicesRow>;
                    Update: Partial<ServicesRow>;
                    Relationships: [];
                  };
                  patients: {
                    Row: PatientsRow;
                    Insert: Partial<PatientsRow>;
                    Update: Partial<PatientsRow>;
                    Relationships: [];
                  };
                  patient_records: {
                    Row: PatientRecordsRow;
                    Insert: Partial<PatientRecordsRow>;
                    Update: Partial<PatientRecordsRow>;
                    Relationships: [];
                  };
                  appointment_requests: {
                    Row: AppointmentRequestsRow;
                    Insert: Partial<AppointmentRequestsRow>;
                    Update: Partial<AppointmentRequestsRow>;
                    Relationships: [];
                  };
                  rooms: {
                    Row: RoomsRow;
                    Insert: Partial<RoomsRow>;
                    Update: Partial<RoomsRow>;
                    Relationships: [];
                  };
                  appointments: {
                    Row: AppointmentsRow;
                    Insert: Partial<AppointmentsRow>;
                    Update: Partial<AppointmentsRow>;
                    Relationships: [];
                  };
                  products: {
                    Row: ProductsRow;
                    Insert: Partial<ProductsRow>;
                    Update: Partial<ProductsRow>;
                    Relationships: [];
                  };
                  inventory_movements: {
                    Row: InventoryMovementsRow;
                    Insert: Partial<InventoryMovementsRow>;
                    Update: Partial<InventoryMovementsRow>;
                    Relationships: [];
                  };
                  sales: {
                    Row: SalesRow;
                    Insert: Partial<SalesRow>;
                    Update: Partial<SalesRow>;
                    Relationships: [];
                  };
                  sale_items: {
                    Row: SaleItemsRow;
                    Insert: Partial<SaleItemsRow>;
                    Update: Partial<SaleItemsRow>;
                    Relationships: [];
                  };
                  testimonials: {
                    Row: TestimonialsRow;
                    Insert: Partial<TestimonialsRow>;
                    Update: Partial<TestimonialsRow>;
                    Relationships: [];
                  };
                  promotions: {
                    Row: PromotionsRow;
                    Insert: Partial<PromotionsRow>;
                    Update: Partial<PromotionsRow>;
                    Relationships: [];
                  };
          };
          Views: Record<string, never>;
          Functions: Record<string, never>;
          Enums: Record<string, never>;
    };
}
