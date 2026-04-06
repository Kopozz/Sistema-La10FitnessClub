import React, { useState } from 'react';
import { useGymStore } from '../../store/gymStore';
import { Search, UserCheck } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/format';
import styles from './CheckIn.module.css';

const CheckInView: React.FC = () => {
  const { miembros, registerCheckIn, checkins } = useGymStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMembers = searchTerm.trim() === '' 
    ? [] 
    : miembros.filter(m => 
        m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);

  const handleCheckIn = (memberId: string) => {
    registerCheckIn(memberId);
    setSearchTerm('');
    // Typically we'd show a success toast here
  };

  const getMemberName = (id: string) => miembros.find(m => m.id === id)?.nombre || 'Desconocido';

  const recentCheckins = [...checkins]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 10);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>CHECK-IN</h1>
        <p className={styles.subtitle}>Registra la asistencia de los miembros</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.searchPanel}>
          <h2 className={styles.panelTitle}>BUSCAR MIEMBRO</h2>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="Buscar por nombre, email o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.results}>
            {searchTerm.trim() !== '' && filteredMembers.length === 0 && (
              <p className={styles.noResults}>No se encontraron miembros</p>
            )}
            
            {filteredMembers.map(member => (
              <div key={member.id} className={styles.memberCard}>
                <div className={styles.memberInfo}>
                  <p className={styles.memberName}>{member.nombre}</p>
                  <p className={styles.memberEmail}>{member.email}</p>
                </div>
                <button 
                  className={styles.checkInBtn}
                  onClick={() => handleCheckIn(member.id)}
                >
                  <UserCheck size={16} />
                  Registrar
                </button>
              </div>
            ))}

            {searchTerm.trim() === '' && (
              <div className={styles.emptySearch}>
                <UserCheck size={48} className={styles.emptyIcon} />
                <p>Busca un miembro para registrar su check-in</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.recentPanel}>
          <h2 className={styles.panelTitle}>ÚLTIMOS CHECK-INS</h2>
          <div className={styles.checkinList}>
            {recentCheckins.length === 0 ? (
              <p className={styles.noResults}>No hay check-ins registrados</p>
            ) : (
              recentCheckins.map(ci => (
                <div key={ci.id} className={styles.checkinItem}>
                  <div className={styles.ciInfo}>
                    <p className={styles.ciName}>{getMemberName(ci.miembroId)}</p>
                    <p className={styles.ciDate}>{formatDate(ci.fecha)}</p>
                  </div>
                  <div className={styles.ciTime}>
                    {formatTime(ci.fecha)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInView;
