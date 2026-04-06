import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  Calendar, 
  CheckCircle, 
  CreditCard, 
  Settings,
  LogOut
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'DASHBOARD' },
    { to: '/miembros', icon: Users, label: 'MIEMBROS' },
    { to: '/entrenadores', icon: Dumbbell, label: 'ENTRENADORES' },
    { to: '/clases', icon: Calendar, label: 'CLASES' },
    { to: '/checkin', icon: CheckCircle, label: 'CHECK-IN' },
    { to: '/pagos', icon: CreditCard, label: 'PAGOS' },
    { to: '/planes', icon: Settings, label: 'PLANES' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoText}>
          <span className={styles.logoLa}>LA 10</span>
          <span className={styles.logoFc}>FITNESS CLUB</span>
        </div>
        <div className={styles.rainbowLine} />
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} className={isActive ? styles.iconActive : styles.icon} />
                <span className={styles.label}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

        <button onClick={handleLogout} className={styles.logoutButton}>
          <LogOut size={18} className={styles.logoutIcon} />
          <span className={styles.label}>CERRAR SESIÓN</span>
        </button>
      </nav>
      
      <div className={styles.footer}>
        MADE BY ANTIGRAVITY
      </div>
    </aside>
  );
};

export default Sidebar;

