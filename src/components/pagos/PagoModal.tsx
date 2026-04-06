import React, { useEffect, useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import Modal from '../ui/Modal';
import type { Payment } from '../../types';
import styles from '../miembros/MiembroModal.module.css'; // Reusing modal styles

interface PagoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PagoModal: React.FC<PagoModalProps> = ({ isOpen, onClose }) => {
  const { addPayment, miembros, planes } = useGymStore();
  const [formData, setFormData] = useState<Omit<Payment, 'id'>>({
    miembroId: '',
    monto: 0,
    fecha: new Date().toISOString().slice(0, 10),
    metodo: 'efectivo',
    descripcion: '',
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        miembroId: '',
        monto: 0,
        fecha: new Date().toISOString().slice(0, 10),
        metodo: 'efectivo',
        descripcion: '',
      });
    }
  }, [isOpen]);

  const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const memberId = e.target.value;
    const member = miembros.find(m => m.id === memberId);
    const plan = planes.find(p => p.id === member?.planId);
    
    setFormData({
      ...formData,
      miembroId: memberId,
      monto: plan ? plan.precio : 0
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPayment(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="REGISTRAR NUEVO PAGO" size="md">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label className={styles.label}>Miembro</label>
          <select 
            className={styles.select}
            required
            value={formData.miembroId}
            onChange={handleMemberChange}
          >
            <option value="">Seleccionar miembro</option>
            {miembros.map(member => (
              <option key={member.id} value={member.id}>
                {member.nombre} - {member.email}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label className={styles.label}>Monto</label>
            <input 
              className={styles.input}
              type="number" 
              required
              value={formData.monto}
              onChange={(e) => setFormData({ ...formData, monto: Number(e.target.value) })}
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Método de Pago</label>
            <select 
              className={styles.select}
              required
              value={formData.metodo}
              onChange={(e) => setFormData({ ...formData, metodo: e.target.value as Payment['metodo'] })}
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Fecha</label>
          <input 
            className={styles.input}
            type="date" 
            required
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Descripción / Notas (Opcional)</label>
          <textarea 
            className={styles.input}
            rows={3}
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveBtn}>
            Registrar Pago
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PagoModal;
