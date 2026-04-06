import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import Modal from '../ui/Modal';
import type { Plan } from '../../types';
import styles from '../miembros/MiembroModal.module.css'; // Reusing modal styles

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Plan;
}

const PlanModal: React.FC<PlanModalProps> = ({ 
  isOpen, 
  onClose, 
  initialData 
}) => {
  const { addPlan, updatePlan } = useGymStore();
  const [formData, setFormData] = useState<Omit<Plan, 'id'>>(() => {
    if (initialData) {
      return {
        nombre: initialData.nombre,
        duracion: initialData.duracion,
        precio: initialData.precio,
        descripcion: initialData.descripcion || '',
      };
    }
    return {
      nombre: '',
      duracion: 1,
      precio: 0,
      descripcion: '',
    };
  });




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      updatePlan(initialData.id, formData);
    } else {
      addPlan(formData);
    }
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'EDITAR PLAN' : 'CREAR NUEVO PLAN'}
      size="md"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label className={styles.label}>Nombre del Plan</label>
          <input 
            className={styles.input}
            type="text" 
            placeholder="Ej: Plan Mensual, Membresía VIP"
            required 
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Duración (meses)</label>
            <input 
              className={styles.input}
              type="number" 
              required
              min={1}
              value={formData.duracion}
              onChange={(e) => setFormData({ ...formData, duracion: Number(e.target.value) })}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Precio (COP)</label>
            <input 
              className={styles.input}
              type="number" 
              required
              min={0}
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Descripción (Opcional)</label>
          <textarea 
            className={styles.input}
            rows={3}
            placeholder="Detalles sobre beneficios o condiciones..."
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveBtn}>
            {initialData ? 'Guardar Cambios' : 'Crear Plan'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PlanModal;
