import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import { Plus, Edit2, Trash2, Clock, Users } from 'lucide-react';
import ConfirmDialog from '../ui/ConfirmDialog';
import PlanModal from './PlanModal';
import type { Plan } from '../../types';
import styles from './Planes.module.css';

const PlanesGrid: React.FC = () => {
  const { planes, miembros, deletePlan } = useGymStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | undefined>(undefined);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);

  const handleEdit = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedPlan(undefined);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setPlanToDelete(id);
    setIsConfirmOpen(true);
  };

  const getMemberCount = (planId: string) => 
    miembros.filter(m => m.planId === planId).length;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>PLANES</h1>
          <p className={styles.subtitle}>Configuración de planes de membresía</p>
        </div>
        <button className={styles.addBtn} onClick={handleAdd}>
          <Plus size={18} />
          Crear Plan
        </button>
      </header>

      <div className={styles.grid}>
        {planes.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No hay planes creados. Comienza creando uno nuevo.</p>
          </div>
        ) : (
          planes.map((plan) => (
            <div key={plan.id} className={styles.planCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.planName}>{plan.nombre}</h3>
                <div className={styles.actions}>
                  <button className={styles.editBtn} onClick={() => handleEdit(plan)}>
                    <Edit2 size={14} />
                  </button>
                  <button className={styles.deleteBtn} onClick={() => handleDeleteClick(plan.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <div className={styles.priceContainer}>
                <span className={styles.currency}>$</span>
                <span className={styles.price}>{plan.precio.toLocaleString()}</span>
                <span className={styles.period}>/ COP</span>
              </div>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <Clock size={16} className={styles.icon} />
                  <span>{plan.duracion} {plan.duracion === 1 ? 'Mes' : 'Meses'} de duración</span>
                </div>
                <div className={styles.detailItem}>
                  <Users size={16} className={styles.icon} />
                  <span>{getMemberCount(plan.id)} miembros registrados</span>
                </div>
              </div>

              {plan.descripcion && (
                <p className={styles.description}>{plan.descripcion}</p>
              )}
            </div>
          ))
        )}
      </div>

      <PlanModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={selectedPlan} 
      />

      <ConfirmDialog 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => planToDelete && deletePlan(planToDelete)}
        title="ELIMINAR PLAN"
        message="¿Estás seguro de que deseas eliminar este plan? Esto podría afectar a los miembros asociados."
        variant="danger"
      />
    </div>
  );
};

export default PlanesGrid;
