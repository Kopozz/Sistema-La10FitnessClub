import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import { Plus, Trash2, DollarSign } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format';
import ConfirmDialog from '../ui/ConfirmDialog';
import PagoModal from './PagoModal';
import styles from '../miembros/Miembros.module.css'; // Reusing table styles
import pagoStyles from './Pagos.module.css';

const PagosTable: React.FC = () => {
  const { pagos, miembros, deletePayment } = useGymStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null);

  const getMemberName = (id: string) => miembros.find(m => m.id === id)?.nombre || 'Desconocido';

  const totalRevenue = pagos.reduce((sum, p) => sum + p.monto, 0);

  const handleDeleteClick = (id: string) => {
    setPaymentToDelete(id);
    setIsConfirmOpen(true);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>PAGOS</h1>
          <p className={styles.subtitle}>Registro de ingresos y pagos de miembros</p>
        </div>
        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          Registrar Pago
        </button>
      </header>

      <div className={pagoStyles.totalCard}>
        <div className={pagoStyles.iconContainer}>
          <DollarSign size={24} />
        </div>
        <div className={pagoStyles.totalInfo}>
          <p className={pagoStyles.totalTitle}>RECAUDACIÓN TOTAL</p>
          <h2 className={pagoStyles.totalValue}>{formatCurrency(totalRevenue)}</h2>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>MIEMBRO</th>
                <th>FECHA</th>
                <th>MÉTODO</th>
                <th>MONTO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {pagos.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyCell}>No hay pagos registrados</td>
                </tr>
              ) : (
                pagos.map((payment) => (
                  <tr key={payment.id}>
                    <td className={styles.nameCell}>{getMemberName(payment.miembroId)}</td>
                    <td>{formatDate(payment.fecha)}</td>
                    <td className="capitalize">{payment.metodo}</td>
                    <td className={pagoStyles.montoCell}>{formatCurrency(payment.monto)}</td>
                    <td className={styles.actions}>
                      <button className={styles.deleteBtn} onClick={() => handleDeleteClick(payment.id)}>
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PagoModal 
        key={isModalOpen ? 'open' : 'closed'}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />


      <ConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => paymentToDelete && deletePayment(paymentToDelete)}
        title="ELIMINAR PAGO"
        message="¿Estás seguro de que deseas eliminar este registro de pago? Esta acción no se puede deshacer."
        variant="danger"
      />
    </div>
  );
};

export default PagosTable;
