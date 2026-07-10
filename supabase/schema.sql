-- =============================================================
-- SANANDO PIES · Esquema de base de datos (Supabase / Postgres)
-- Diseñado para el plan Free: normalizado, sin duplicidad,
-- con soporte de archivado (soft delete) para depuración futura.
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- =============================================================

create extension if not exists "uuid-ossp";

-- ---------- STAFF (usuarios del panel administrativo) ----------
create table if not exists staff (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade unique,
  full_name text not null,
  role text not null check (role in ('admin', 'especialista', 'recepcion')),
  photo_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- ESPECIALISTAS ----------
create table if not exists specialists (
  id uuid primary key default uuid_generate_v4(),
  staff_id uuid references staff(id) on delete set null,
  full_name text not null,
  specialty text not null,
  experience_years int not null default 0,
  photo_url text,
  bio text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- SERVICIOS / TRATAMIENTOS ----------
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  duration_minutes int not null default 30,
  price numeric(10,2) not null default 0,
  icon text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- PACIENTES ----------
create table if not exists patients (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text not null,
  email text,
  birth_date date,
  created_at timestamptz not null default now(),
  archived_at timestamptz
);

-- ---------- EXPEDIENTE CLÍNICO (1:1 con paciente) ----------
create table if not exists patient_records (
  patient_id uuid primary key references patients(id) on delete cascade,
  medical_history text,
  allergies text,
  notes text,
  updated_at timestamptz not null default now()
);

-- ---------- SOLICITUDES DE CITA (formulario público, sin cuenta) ----------
create table if not exists appointment_requests (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text not null,
  email text not null,
  reason text not null,
  comments text,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- CONSULTORIOS ----------
create table if not exists rooms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  active boolean not null default true
);

-- ---------- CITAS ----------
create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references patients(id) on delete restrict,
  specialist_id uuid not null references specialists(id) on delete restrict,
  service_id uuid not null references services(id) on delete restrict,
  room_id uuid references rooms(id) on delete set null,
  appointment_date date not null,
  start_time time not null,
  end_time time not null,
  status text not null default 'pendiente'
    check (status in ('pendiente','confirmada','en_consulta','finalizada','cancelada')),
  source_request_id uuid references appointment_requests(id) on delete set null,
  created_at timestamptz not null default now(),
  archived_at timestamptz
);
create index if not exists idx_appointments_date on appointments (appointment_date);

-- ---------- PRODUCTOS ----------
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  cost numeric(10,2) not null default 0,
  stock int not null default 0,
  min_stock int not null default 5,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- MOVIMIENTOS DE INVENTARIO (evita duplicar stock) ----------
create table if not exists inventory_movements (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  type text not null check (type in ('entrada','salida','ajuste')),
  quantity int not null,
  reason text,
  created_by uuid references staff(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- VENTAS ----------
create table if not exists sales (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references patients(id) on delete set null,
  total numeric(10,2) not null default 0,
  payment_method text,
  created_at timestamptz not null default now()
);

create table if not exists sale_items (
  id uuid primary key default uuid_generate_v4(),
  sale_id uuid not null references sales(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  quantity int not null default 1,
  unit_price numeric(10,2) not null
);

-- ---------- TESTIMONIOS ----------
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  patient_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  treatment text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- PROMOCIONES ----------
create table if not exists promotions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  starts_at date,
  ends_at date,
  active boolean not null default true
);

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================

alter table appointment_requests enable row level security;
alter table testimonials enable row level security;
alter table promotions enable row level security;
alter table services enable row level security;
alter table specialists enable row level security;
alter table products enable row level security;

alter table patients enable row level security;
alter table patient_records enable row level security;
alter table appointments enable row level security;
alter table rooms enable row level security;
alter table sales enable row level security;
alter table sale_items enable row level security;
alter table inventory_movements enable row level security;
alter table staff enable row level security;

-- Lectura pública de catálogo (sitio público, sin login)
create policy "public_read_services" on services for select using (active = true);
create policy "public_read_specialists" on specialists for select using (active = true);
create policy "public_read_products" on products for select using (active = true);
create policy "public_read_testimonials" on testimonials for select using (published = true);
create policy "public_read_promotions" on promotions for select using (active = true);

-- Inserción pública de solicitudes de cita (formulario, sin cuenta)
create policy "public_insert_appointment_requests" on appointment_requests
  for insert with check (true);

-- Todo lo demás: solo personal autenticado (staff) puede leer/escribir
create policy "staff_all_patients" on patients for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "staff_all_patient_records" on patient_records for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "staff_all_appointments" on appointments for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "staff_all_rooms" on rooms for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "staff_all_sales" on sales for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "staff_all_sale_items" on sale_items for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "staff_all_inventory" on inventory_movements for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "staff_read_appointment_requests" on appointment_requests
  for select using (auth.role() = 'authenticated');
create policy "staff_update_appointment_requests" on appointment_requests
  for update using (auth.role() = 'authenticated');
create policy "staff_self" on staff for select using (auth.role() = 'authenticated');

-- Escritura de catálogo solo para staff autenticado
create policy "staff_write_services" on services for insert with check (auth.role() = 'authenticated');
create policy "staff_update_services" on services for update using (auth.role() = 'authenticated');
create policy "staff_write_specialists" on specialists for insert with check (auth.role() = 'authenticated');
create policy "staff_update_specialists" on specialists for update using (auth.role() = 'authenticated');
create policy "staff_write_products" on products for insert with check (auth.role() = 'authenticated');
create policy "staff_update_products" on products for update using (auth.role() = 'authenticated');
