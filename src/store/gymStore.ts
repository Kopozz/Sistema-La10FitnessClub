import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GymState } from '../types';

export const useGymStore = create<GymState>()(
  persist(
    (set) => ({
      miembros: [],
      entrenadores: [],
      clases: [],
      pagos: [],
      planes: [],
      checkins: [],

      addMember: (member) => 
        set((state) => ({
          miembros: [...state.miembros, { ...member, id: crypto.randomUUID() }]
        })),
      updateMember: (id, member) =>
        set((state) => ({
          miembros: state.miembros.map((m) => (m.id === id ? { ...m, ...member } : m))
        })),
      deleteMember: (id) =>
        set((state) => ({
          miembros: state.miembros.filter((m) => m.id !== id)
        })),

      addTrainer: (trainer) =>
        set((state) => ({
          entrenadores: [...state.entrenadores, { ...trainer, id: crypto.randomUUID() }]
        })),
      updateTrainer: (id, trainer) =>
        set((state) => ({
          entrenadores: state.entrenadores.map((t) => (t.id === id ? { ...t, ...trainer } : t))
        })),
      deleteTrainer: (id) =>
        set((state) => ({
          entrenadores: state.entrenadores.filter((t) => t.id !== id)
        })),

      addClass: (session) =>
        set((state) => ({
          clases: [...state.clases, { ...session, id: crypto.randomUUID() }]
        })),
      updateClass: (id, session) =>
        set((state) => ({
          clases: state.clases.map((c) => (c.id === id ? { ...c, ...session } : c))
        })),
      deleteClass: (id) =>
        set((state) => ({
          clases: state.clases.filter((c) => c.id !== id)
        })),

      addPayment: (payment) =>
        set((state) => ({
          pagos: [...state.pagos, { ...payment, id: crypto.randomUUID() }]
        })),
      deletePayment: (id) =>
        set((state) => ({
          pagos: state.pagos.filter((p) => p.id !== id)
        })),

      addPlan: (plan) =>
        set((state) => ({
          planes: [...state.planes, { ...plan, id: crypto.randomUUID() }]
        })),
      updatePlan: (id, plan) =>
        set((state) => ({
          planes: state.planes.map((p) => (p.id === id ? { ...p, ...plan } : p))
        })),
      deletePlan: (id) =>
        set((state) => ({
          planes: state.planes.filter((p) => p.id !== id)
        })),

      registerCheckIn: (miembroId) =>
        set((state) => ({
          checkins: [
            ...state.checkins,
            { id: crypto.randomUUID(), miembroId, fecha: new Date().toISOString() }
          ]
        })),
    }),
    {
      name: 'la10gym-storage',
    }
  )
);
