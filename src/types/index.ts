export type MemberStatus = 'activo' | 'inactivo';

export interface Plan {
  id: string;
  nombre: string;
  duracion: number; // meses
  precio: number;
  descripcion?: string;
}

export interface Member {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  contactoEmergencia: string;
  planId: string;
  fechaInicio: string;
  fechaFin: string;
  estado: MemberStatus;
}

export interface Trainer {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  especializacion: string;
  estado: MemberStatus;
}

export interface ClassSession {
  id: string;
  nombre: string;
  entrenadorId: string;
  fechaHora: string;
  duracion: number; // minutos
  capacidad: number;
  descripcion?: string;
}

export interface Payment {
  id: string;
  miembroId: string;
  monto: number;
  fecha: string;
  metodo: 'efectivo' | 'tarjeta' | 'transferencia';
  descripcion?: string;
}

export interface CheckIn {
  id: string;
  miembroId: string;
  fecha: string;
}

export interface GymState {
  miembros: Member[];
  entrenadores: Trainer[];
  clases: ClassSession[];
  pagos: Payment[];
  planes: Plan[];
  checkins: CheckIn[];
  
  // Acciones
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  
  addTrainer: (trainer: Omit<Trainer, 'id'>) => void;
  updateTrainer: (id: string, trainer: Partial<Trainer>) => void;
  deleteTrainer: (id: string) => void;
  
  addClass: (session: Omit<ClassSession, 'id'>) => void;
  updateClass: (id: string, session: Partial<ClassSession>) => void;
  deleteClass: (id: string) => void;
  
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  deletePayment: (id: string) => void;
  
  addPlan: (plan: Omit<Plan, 'id'>) => void;
  updatePlan: (id: string, plan: Partial<Plan>) => void;
  deletePlan: (id: string) => void;
  
  registerCheckIn: (miembroId: string) => void;
}
