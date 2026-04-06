import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import { Edit2, Trash2, Plus, Clock, Users } from 'lucide-react';
import ConfirmDialog from '../ui/ConfirmDialog';
import ClaseModal from './ClaseModal';
import type { ClassSession } from '../../types';
import styles from '../miembros/Miembros.module.css'; // Reusing table styles
import classStyles from './Clases.module.css';

const ClasesTable: React.FC = () => {
  const { clases, entrenadores, deleteClass } = useGymStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassSession | undefined>(undefined);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<string | null>(null);

  const handleEdit = (session: ClassSession) => {
    setSelectedClass(session);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedClass(undefined);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setClassToDelete(id);
    setIsConfirmOpen(true);
  };

  const getTrainerName = (id: string) => 
    entrenadores.find(t => t.id === id)?.nombre || 'Sin asignar';

  const formatDateTime = (isoString: string) => {
    const d = new Date(isoString);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>CLASES</h1>
          <p className={styles.subtitle}>Programación de clases y entrenamientos</p>
        </div>
        <button className={styles.addBtn} onClick={handleAdd}>
          <Plus size={18} />
          Agregar Clase
        </button>
      </header>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>NOMBRE</th>
                <th>ENTRENADOR</th>
                <th>FECHA Y HORA</th>
                <th>DURACIÓN</th>
                <th>CAPACIDAD</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {clases.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyCell}>No hay clases programadas</td>
                </tr>
              ) : (
                clases.map((session) => (
                  <tr key={session.id}>
                    <td className={styles.nameCell}>{session.nombre}</td>
                    <td>{getTrainerName(session.entrenadorId)}</td>
                    <td>{formatDateTime(session.fechaHora)}</td>
                    <td>
                      <div className={classStyles.infoRow}>
                        <Clock size={14} className={classStyles.icon} />
                        {session.duracion} min
                      </div>
                    </td>
                    <td>
                      <div className={classStyles.infoRow}>
                        <Users size={14} className={classStyles.icon} />
                        Max. {session.capacidad}
                      </div>
                    </td>
                    <td className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => handleEdit(session)}>
                        <Edit2 size={14} />
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDeleteClick(session.id)}>
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

      <ClaseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={selectedClass} 
      />

      <ConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => classToDelete && deleteClass(classToDelete)}
        title="ELIMINAR CLASE"
        message="¿Estás seguro de que deseas eliminar esta clase? Esta acción no se puede deshacer."
        variant="danger"
      />
    </div>
  );
};

export default ClasesTable;
