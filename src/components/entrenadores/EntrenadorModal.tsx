import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import Modal from '../ui/Modal';
import type { Trainer } from '../../types';
import styles from '../miembros/MiembroModal.module.css'; // Reusing modal styles

interface EntrenadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Trainer;
}

const EntrenadorModal: React.FC<EntrenadorModalProps> = ({ 
  isOpen, 
  onClose, 
  initialData 
}) => {
  const { addTrainer, updateTrainer } = useGymStore();
  const [formData, setFormData] = useState<Omit<Trainer, 'id'>>(() => {
    if (initialData) {
      return {
        nombre: initialData.nombre,
        email: initialData.email,
        telefono: initialData.telefono,
        especializacion: initialData.especializacion,
        estado: initialData.estado,
      };
    }
    return {
      nombre: '',
      email: '',
      telefono: '',
      especializacion: '',
      estado: 'activo',
    };
  });




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      updateTrainer(initialData.id, formData);
    } else {
      addTrainer(formData);
    }
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'EDITAR ENTRENADOR' : 'NUEVO ENTRENADOR'}
      size="md"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label className={styles.label}>Nombre Completo</label>
          <input 
            className={styles.input}
            type="text" 
            required 
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Email</label>
            <input 
              className={styles.input}
              type="email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Teléfono</label>
            <input 
              className={styles.input}
              type="tel" 
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Especialización</label>
          <input 
            className={styles.input}
            type="text" 
            placeholder="Ej: CrossFit, Yoga, Musculación"
            value={formData.especializacion}
            onChange={(e) => setFormData({ ...formData, especializacion: e.target.value })}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Estado</label>
          <select 
            className={styles.select}
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value as Trainer['estado'] })}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveBtn}>
            {initialData ? 'Guardar Cambios' : 'Crear Entrenador'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EntrenadorModal;
