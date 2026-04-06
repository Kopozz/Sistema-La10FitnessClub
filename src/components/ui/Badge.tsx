import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'active' | 'inactive';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'active' }) => {
  return (
    <span className={`${styles.badge} ${variant === 'active' ? styles.active : styles.inactive}`}>
      {children}
    </span>
  );
};

export default Badge;
