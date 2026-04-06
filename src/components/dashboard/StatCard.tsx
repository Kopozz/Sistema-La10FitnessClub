import React from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  subValue: string;
  icon: LucideIcon;
  color: 'red' | 'blue' | 'yellow' | 'green';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subValue, icon: Icon, color }) => {
  return (
    <div className={styles.card}>
      <div className={`${styles.iconContainer} ${styles[color]}`}>
        <Icon size={22} strokeWidth={2.5} />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <h2 className={styles.value}>{value}</h2>
        <p className={styles.subValue}>{subValue}</p>
      </div>
    </div>
  );
};

export default StatCard;
