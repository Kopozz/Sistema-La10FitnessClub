import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import { Edit2, Trash2, Plus } from 'lucide-react';
import Badge from '../ui/Badge';
import ConfirmDialog from '../ui/ConfirmDialog';
import EntrenadorModal from './EntrenadorModal';
import type { Trainer } from '../../types';
import styles from '../miembros/Miembros.module.css'; // Reusing table styles

const EntrenadoresTable: React.FC = () => {
  const { entrenadores, deleteTrainer } = useGymStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | undefined>(undefined);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState<string | null>(null);

  const handleEdit = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedTrainer(undefined);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setTrainerToDelete(id);
    setIsConfirmOpen(true);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>ENTRENADORES</h1>
          <p className={styles.subtitle}>Gestión de entrenadores del gimnasio</p>
        </div>
        <button className={styles.addBtn} onClick={handleAdd}>
          <Plus size={18} />
          Agregar Entrenador
        </button>
      </header>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>EMAIL</th>
                <th>TELÉFONO</th>
                <th>ESPECIALIZACIÓN</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {entrenadores.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyCell}>No hay entrenadores registrados</td>
                </tr>
              ) : (
                entrenadores.map((trainer) => (
                  <tr key={trainer.id}>
                    <td className={styles.nameCell}>{trainer.nombre}</td>
                    <td>{trainer.email || '-'}</td>
                    <td>{trainer.telefono || '-'}</td>
                    <td>{trainer.especializacion || '-'}</td>
                    <td>
                      <Badge variant={trainer.estado === 'activo' ? 'active' : 'inactive'}>
                        {trainer.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => handleEdit(trainer)}>
                        <Edit2 size={14} />
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDeleteClick(trainer.id)}>
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

      <EntrenadorModal 
        key={selectedTrainer?.id || 'new'}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={selectedTrainer} 
      />

      <ConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => trainerToDelete && deleteTrainer(trainerToDelete)}
        title="ELIMINAR ENTRENADOR"
        message="¿Estás seguro de que deseas eliminar este entrenador? Esta acción no se puede deshacer."
        variant="danger"
      />
    </div>
  );
};

export default EntrenadoresTable;
