export type AppointmentStatus =
  | "pendiente"
  | "confirmada"
  | "en_consulta"
  | "finalizada"
  | "cancelada";

export interface Appointment {
  id: string;
  patientName: string;
  specialistName: string;
  service: string;
  room: string;
  date: string; // ISO date
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: AppointmentStatus;
}

export interface AppointmentRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  reason: string;
  comments?: string;
  createdAt: string;
  handled: boolean;
}

export interface Patient {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  lastVisit: string;
  totalVisits: number;
  activeConditions: string[];
}

export interface Specialist {
  id: string;
  fullName: string;
  specialty: string;
  experienceYears: number;
  photoUrl: string;
  bio: string;
}

export interface TreatmentService {
  id: string;
  name: string;
  slug: string;
  description: string;
  durationMinutes: number;
  price: number;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  treatment: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
