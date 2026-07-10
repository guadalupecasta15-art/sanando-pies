import type {
  Appointment,
  AppointmentRequest,
  FaqItem,
  Patient,
  Product,
  Specialist,
  Testimonial,
  TreatmentService,
} from "@/types/domain";

export const treatments: TreatmentService[] = [
  {
    id: "1",
    name: "Uña encarnada",
    slug: "una-encarnada",
    description:
      "Tratamiento sin cirugía con recuperación rápida y mínima molestia, eliminando la causa de raíz.",
    durationMinutes: 45,
    price: 850,
    icon: "footprints",
  },
  {
    id: "2",
    name: "Hongos en las uñas",
    slug: "hongos-en-las-unas",
    description:
      "Eliminamos la infección y restauramos la salud y apariencia natural de la uña.",
    durationMinutes: 40,
    price: 750,
    icon: "shield",
  },
  {
    id: "3",
    name: "Pie diabético",
    slug: "pie-diabetico",
    description:
      "Cuidado especializado y preventivo para pacientes en riesgo, con seguimiento continuo.",
    durationMinutes: 50,
    price: 900,
    icon: "heart-pulse",
  },
  {
    id: "4",
    name: "Valoración podológica",
    slug: "valoracion-podologica",
    description: "Diagnóstico profesional y personalizado del estado de salud de tus pies.",
    durationMinutes: 30,
    price: 500,
    icon: "clipboard-check",
  },
  {
    id: "5",
    name: "Callosidades",
    slug: "callosidades",
    description: "Remoción segura de callosidades y durezas para caminar sin dolor.",
    durationMinutes: 30,
    price: 550,
    icon: "sparkles",
  },
  {
    id: "6",
    name: "Fascitis plantar",
    slug: "fascitis-plantar",
    description: "Terapia dirigida para reducir la inflamación y el dolor del talón.",
    durationMinutes: 45,
    price: 800,
    icon: "activity",
  },
  {
    id: "7",
    name: "Plantillas ortopédicas",
    slug: "plantillas-ortopedicas",
    description: "Estudio de la pisada y diseño de plantillas a la medida de tu pie.",
    durationMinutes: 40,
    price: 1200,
    icon: "footprints",
  },
];

export const specialists: Specialist[] = [
  {
    id: "1",
    fullName: "Dr. Alejandro Ruiz",
    specialty: "Podología clínica y quirúrgica",
    experienceYears: 12,
    photoUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
    bio: "Especialista en uña encarnada y cirugía podológica mínimamente invasiva.",
  },
  {
    id: "2",
    fullName: "Dra. Mariana Solís",
    specialty: "Pie diabético y biomecánica",
    experienceYears: 9,
    photoUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
    bio: "Enfocada en prevención y seguimiento de pacientes con pie de riesgo.",
  },
  {
    id: "3",
    fullName: "Dr. Luis Fernández",
    specialty: "Valoración y estudio de la pisada",
    experienceYears: 7,
    photoUrl:
      "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=400&auto=format&fit=crop",
    bio: "Diseño de plantillas ortopédicas personalizadas con análisis digital.",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Crema hidratante podológica",
    description: "Fórmula intensiva para talones agrietados y piel seca.",
    price: 320,
    stock: 24,
    minStock: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Plantillas de gel deportivas",
    description: "Amortiguación para actividades de alto impacto.",
    price: 480,
    stock: 6,
    minStock: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Kit de cuidado antifúngico",
    description: "Spray y crema para prevención y tratamiento de hongos.",
    price: 590,
    stock: 15,
    minStock: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=400&auto=format&fit=crop",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    patientName: "Ana Martínez",
    rating: 5,
    comment:
      "Después de años con dolor por una uña encarnada, el tratamiento fue rápido y sin cirugía invasiva. Excelente atención.",
    treatment: "Uña encarnada",
  },
  {
    id: "2",
    patientName: "José Ramírez",
    rating: 5,
    comment:
      "La valoración podológica fue muy completa. Me explicaron cada paso y ahora llevo un seguimiento constante.",
    treatment: "Valoración podológica",
  },
  {
    id: "3",
    patientName: "María González",
    rating: 5,
    comment:
      "Mis plantillas ortopédicas cambiaron por completo la forma en que camino. El estudio de la pisada fue muy profesional.",
    treatment: "Plantillas ortopédicas",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "1",
    question: "¿Necesito una cita previa para ser atendido?",
    answer:
      "Sí, para garantizar tiempo y atención adecuados trabajamos únicamente con citas agendadas previamente.",
  },
  {
    id: "2",
    question: "¿Atienden pacientes con diabetes?",
    answer:
      "Sí, contamos con protocolos especializados de cuidado preventivo para pie diabético.",
  },
  {
    id: "3",
    question: "¿Los tratamientos de uña encarnada requieren cirugía?",
    answer:
      "En la mayoría de los casos aplicamos técnicas sin cirugía. El especialista determinará el mejor abordaje en tu valoración.",
  },
  {
    id: "4",
    question: "¿Qué formas de pago aceptan?",
    answer: "Aceptamos efectivo, tarjeta de crédito/débito y transferencia.",
  },
];

// ---- Datos administrativos (mock, listos para sustituirse por Supabase) ----

export const dashboardStats = {
  registeredPatients: 523,
  patientsThisMonth: 18,
  appointmentsToday: 24,
  monthlyRevenue: 48750,
  revenueChangePct: 12,
  lowStockProducts: 8,
};

export const todayAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Ana Martínez",
    specialistName: "Dr. Alejandro Ruiz",
    service: "Uña encarnada",
    room: "Consultorio 1",
    date: new Date().toISOString(),
    startTime: "09:00",
    endTime: "09:45",
    status: "confirmada",
  },
  {
    id: "2",
    patientName: "José Ramírez",
    specialistName: "Dra. Mariana Solís",
    service: "Valoración podológica",
    room: "Consultorio 2",
    date: new Date().toISOString(),
    startTime: "10:00",
    endTime: "10:30",
    status: "pendiente",
  },
  {
    id: "3",
    patientName: "Luis Herrera",
    specialistName: "Dr. Alejandro Ruiz",
    service: "Hongos en las uñas",
    room: "Consultorio 1",
    date: new Date().toISOString(),
    startTime: "11:30",
    endTime: "12:10",
    status: "en_consulta",
  },
  {
    id: "4",
    patientName: "María González",
    specialistName: "Dr. Luis Fernández",
    service: "Estudio de la pisada",
    room: "Consultorio 3",
    date: new Date().toISOString(),
    startTime: "13:00",
    endTime: "13:40",
    status: "confirmada",
  },
  {
    id: "5",
    patientName: "Carlos Mendoza",
    specialistName: "Dr. Luis Fernández",
    service: "Plantillas ortopédicas",
    room: "Consultorio 3",
    date: new Date().toISOString(),
    startTime: "15:00",
    endTime: "15:40",
    status: "finalizada",
  },
];

export const patientsByMonth = [
  { month: "Ene", total: 78 },
  { month: "Feb", total: 92 },
  { month: "Mar", total: 121 },
  { month: "Abr", total: 104 },
  { month: "May", total: 118 },
];

export const revenueByMonth = [
  { month: "Ene", total: 32000 },
  { month: "Feb", total: 29500 },
  { month: "Mar", total: 41000 },
  { month: "Abr", total: 38200 },
  { month: "May", total: 48750 },
];

export const treatmentDistribution = [
  { name: "Uña encarnada", value: 35, color: "#0B2A4A" },
  { name: "Hongos en uñas", value: 30, color: "#1E5FA8" },
  { name: "Valoración", value: 20, color: "#3E7CB8" },
  { name: "Estudio de pisada", value: 10, color: "#A6C8EB" },
  { name: "Otros", value: 5, color: "#D2E4F5" },
];

export const patients: Patient[] = [
  {
    id: "1",
    fullName: "Ana Martínez",
    phone: "33 1122 3344",
    email: "ana.martinez@correo.com",
    birthDate: "1990-04-12",
    lastVisit: "2025-05-10",
    totalVisits: 6,
    activeConditions: ["Uña encarnada"],
  },
  {
    id: "2",
    fullName: "José Ramírez",
    phone: "33 5566 7788",
    email: "jose.ramirez@correo.com",
    birthDate: "1985-11-02",
    lastVisit: "2025-05-08",
    totalVisits: 3,
    activeConditions: [],
  },
  {
    id: "3",
    fullName: "Luis Herrera",
    phone: "33 9988 1122",
    email: "luis.herrera@correo.com",
    birthDate: "1978-02-20",
    lastVisit: "2025-04-30",
    totalVisits: 11,
    activeConditions: ["Hongos en uñas"],
  },
  {
    id: "4",
    fullName: "María González",
    phone: "33 4455 6677",
    email: "maria.gonzalez@correo.com",
    birthDate: "1995-07-15",
    lastVisit: "2025-05-12",
    totalVisits: 2,
    activeConditions: [],
  },
];

export const appointmentRequests: AppointmentRequest[] = [
  {
    id: "1",
    fullName: "Roberto Islas",
    phone: "33 2233 4455",
    email: "roberto.islas@correo.com",
    reason: "Dolor en talón al caminar",
    comments: "Prefiero cita por la tarde",
    createdAt: new Date().toISOString(),
    handled: false,
  },
  {
    id: "2",
    fullName: "Fernanda Cabrera",
    phone: "33 6677 8899",
    email: "fernanda.cabrera@correo.com",
    reason: "Valoración podológica general",
    createdAt: new Date().toISOString(),
    handled: false,
  },
];
