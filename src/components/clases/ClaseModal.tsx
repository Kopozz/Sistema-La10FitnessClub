import React, { useEffect, useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import Modal from '../ui/Modal';
import type { ClassSession } from '../../types';
import styles from '../miembros/MiembroModal.module.css'; // Reusing modal styles

interface ClaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ClassSession;
}

const ClaseModal: React.FC<ClaseModalProps> = ({ 
  isOpen, 
  onClose, 
  initialData 
}) => {
  const { addClass, updateClass, entrenadores } = useGymStore();
  const [formData, setFormData] = useState<Omit<ClassSession, 'id'>>({
    nombre: '',
    entrenadorId: '',
    fechaHora: '',
    duracion: 60,
    capacidad: 20,
    descripcion: '',
  });

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        nombre: initialData.nombre,
        entrenadorId: initialData.entrenadorId,
        fechaHora: initialData.fechaHora,
        duracion: initialData.duracion,
        capacidad: initialData.capacidad,
        descripcion: initialData.descripcion || '',
      });
    } else {
      setFormData({
        nombre: '',
        entrenadorId: '',
        fechaHora: '',
        duracion: 60,
        capacidad: 20,
        descripcion: '',
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      updateClass(initialData.id, formData);
    } else {
      addClass(formData);
    }
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'EDITAR CLASE' : 'NUEVA CLASE'}
      size="md"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label className={styles.label}>Nombre de la Clase</label>
          <input 
            className={styles.input}
            type="text" 
            placeholder="Ej: Yoga Matutino, CrossFit Avanzado"
            required 
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Entrenador</label>
          <select 
            className={styles.select}
            required
            value={formData.entrenadorId}
            onChange={(e) => setFormData({ ...formData, entrenadorId: e.target.value })}
          >
            <option value="">Seleccionar entrenador</option>
            {entrenadores.filter(t => t.estado === 'activo').map(trainer => (
              <option key={trainer.id} value={trainer.id}>
                {trainer.nombre} - {trainer.especializacion}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Fecha y Hora</label>
            <input 
              className={styles.input}
              type="datetime-local" 
              required
              value={formData.fechaHora}
              onChange={(e) => setFormData({ ...formData, fechaHora: e.target.value })}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Duración (min)</label>
            <input 
              className={styles.input}
              type="number" 
              required
              value={formData.duracion}
              onChange={(e) => setFormData({ ...formData, duracion: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Capacidad Máxima</label>
          <input 
            className={styles.input}
            type="number" 
            required
            value={formData.capacidad}
            onChange={(e) => setFormData({ ...formData, capacidad: Number(e.target.value) })}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Descripción (Opcional)</label>
          <textarea 
            className={`${styles.input} min-h-[100px]`}
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveBtn}>
            {initialData ? 'Guardar Cambios' : 'Crear Clase'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ClaseModal;
