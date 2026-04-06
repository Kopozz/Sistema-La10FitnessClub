import React from 'react';
import { useGymStore } from '../../store/gymStore';
import StatCard from './StatCard';
import { Users, CreditCard, CheckCircle, Calendar } from 'lucide-react';
import { formatCurrency, formatDate, formatTime } from '../../utils/format';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const { miembros, pagos, checkins, clases, entrenadores } = useGymStore();

  const totalMembers = miembros.length;
  const activeMembers = miembros.filter(m => {
    if (m.estado === 'inactivo') return false;
    if (m.fechaFin) {
      const end = new Date(m.fechaFin);
      return end >= new Date();
    }
    return true;
  }).length;

  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyRevenue = pagos
    .filter(p => !p.fecha || p.fecha.slice(0, 7) === currentMonth)
    .reduce((sum, p) => sum + p.monto, 0);

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCheckins = checkins.filter(c => c.fecha && c.fecha.slice(0, 10) === todayStr).length;

  const activeTrainers = entrenadores.filter(t => t.estado === 'activo').length;

  const recentCheckins = [...checkins]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 10);

  const getMemberName = (id: string) => miembros.find(m => m.id === id)?.nombre || 'Desconocido';

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>DASHBOARD</h1>
        <p className={styles.subtitle}>Visión general del gimnasio</p>
      </header>

      <div className={styles.statsGrid}>
        <StatCard 
          title="MIEMBROS TOTALES" 
          value={totalMembers} 
          subValue={`${activeMembers} activos`} 
          icon={Users} 
          color="red" 
        />
        <StatCard 
          title="INGRESOS DEL MES" 
          value={formatCurrency(monthlyRevenue)} 
          subValue="Mes actual" 
          icon={CreditCard} 
          color="blue" 
        />
        <StatCard 
          title="CHECK-INS HOY" 
          value={todayCheckins} 
          subValue="Asistencia del día" 
          icon={CheckCircle} 
          color="yellow" 
        />
        <StatCard 
          title="CLASES PROGRAMADAS" 
          value={clases.length} 
          subValue={`${activeTrainers} entrenadores activos`} 
          icon={Calendar} 
          color="green" 
        />
      </div>

      <div className={styles.recentPanel}>
        <h2 className={styles.panelTitle}>CHECK-INS RECIENTES</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>MIEMBRO</th>
                <th>FECHA</th>
                <th>HORA</th>
              </tr>
            </thead>
            <tbody>
              {recentCheckins.length === 0 ? (
                <tr>
                  <td colSpan={3} className={styles.emptyCell}>No hay check-ins recientes</td>
                </tr>
              ) : (
                recentCheckins.map(checkin => (
                  <tr key={checkin.id}>
                    <td className={styles.memberName}>{getMemberName(checkin.miembroId)}</td>
                    <td>{formatDate(checkin.fecha)}</td>
                    <td>{formatTime(checkin.fecha)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
