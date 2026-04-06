import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import { Edit2, Trash2, Plus } from 'lucide-react';
import Badge from '../ui/Badge';
import ConfirmDialog from '../ui/ConfirmDialog';
import MiembroModal from './MiembroModal';
import type { Member } from '../../types';
import styles from './Miembros.module.css';

const MiembrosTable: React.FC = () => {
  const { miembros, deleteMember, planes } = useGymStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>(undefined);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  const handleEdit = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedMember(undefined);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setMemberToDelete(id);
    setIsConfirmOpen(true);
  };

  const getPlanName = (id: string) => planes.find(p => p.id === id)?.nombre || 'Sin plan';

  const isActive = (member: Member) => {
    if (member.estado === 'inactivo') return false;
    if (member.fechaFin) {
      const end = new Date(member.fechaFin);
      return end >= new Date();
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>MIEMBROS</h1>
          <p className={styles.subtitle}>Gestión de miembros del gimnasio</p>
        </div>
        <button className={styles.addBtn} onClick={handleAdd}>
          <Plus size={18} />
          Agregar Miembro
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
                <th>ESTADO</th>
                <th>MEMBRESÍA</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {miembros.length === 0 ? (
                <tr>
                  <td colSpan={6} className={styles.emptyCell}>No hay miembros registrados</td>
                </tr>
              ) : (
                miembros.map((member) => (
                  <tr key={member.id}>
                    <td className={styles.nameCell}>{member.nombre}</td>
                    <td>{member.email || '-'}</td>
                    <td>{member.telefono || '-'}</td>
                    <td>
                      <Badge variant={isActive(member) ? 'active' : 'inactive'}>
                        {isActive(member) ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td>{getPlanName(member.planId)}</td>
                    <td className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => handleEdit(member)}>
                        <Edit2 size={14} />
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDeleteClick(member.id)}>
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

      <MiembroModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={selectedMember} 
      />

      <ConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => memberToDelete && deleteMember(memberToDelete)}
        title="ELIMINAR MIEMBRO"
        message="¿Estás seguro de que deseas eliminar este miembro? Esta acción no se puede deshacer."
        variant="danger"
      />
    </div>
  );
};

export default MiembrosTable;
