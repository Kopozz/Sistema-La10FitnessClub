import React, { useEffect, useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import Modal from '../ui/Modal';
import type { Member } from '../../types';
import styles from './MiembroModal.module.css';

interface MiembroModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Member;
}

const MiembroModal: React.FC<MiembroModalProps> = ({ 
  isOpen, 
  onClose, 
  initialData 
}) => {
  const { addMember, updateMember, planes } = useGymStore();
  const [formData, setFormData] = useState<Omit<Member, 'id'>>({
    nombre: '',
    email: '',
    telefono: '',
    contactoEmergencia: '',
    planId: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'activo',
  });

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        nombre: initialData.nombre,
        email: initialData.email,
        telefono: initialData.telefono,
        contactoEmergencia: initialData.contactoEmergencia,
        planId: initialData.planId,
        fechaInicio: initialData.fechaInicio,
        fechaFin: initialData.fechaFin,
        estado: initialData.estado,
      });
    } else {
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        contactoEmergencia: '',
        planId: '',
        fechaInicio: '',
        fechaFin: '',
        estado: 'activo',
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      updateMember(initialData.id, formData);
    } else {
      addMember(formData);
    }
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? 'EDITAR MIEMBRO' : 'NUEVO MIEMBRO'}
      size="md"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
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
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Teléfono</label>
            <input 
              className={styles.input}
              type="tel" 
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Contacto de Emergencia</label>
            <input 
              className={styles.input}
              type="text" 
              value={formData.contactoEmergencia}
              onChange={(e) => setFormData({ ...formData, contactoEmergencia: e.target.value })}
            />
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Plan de Membresía</label>
          <select 
            className={styles.select}
            required
            value={formData.planId}
            onChange={(e) => setFormData({ ...formData, planId: e.target.value })}
          >
            <option value="">Seleccionar plan</option>
            {planes.map(plan => (
              <option key={plan.id} value={plan.id}>
                {plan.nombre} - ${plan.precio}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Fecha de Inicio</label>
            <input 
              className={styles.input}
              type="date" 
              required
              value={formData.fechaInicio}
              onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Fecha de Fin</label>
            <input 
              className={styles.input}
              type="date" 
              required
              value={formData.fechaFin}
              onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
            />
          </div>
        </div>

        {initialData && (
          <div className={styles.group}>
            <label className={styles.label}>Estado</label>
            <select 
              className={styles.select}
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value as Member['estado'] })}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        )}

        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveBtn}>
            {initialData ? 'Guardar Cambios' : 'Crear Miembro'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MiembroModal;
