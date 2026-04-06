import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import styles from './Login.module.css';

// Carousel images
import img1 from '../../assets/login/carousel-1.png';
import img2 from '../../assets/login/carousel-2.png';
import img3 from '../../assets/login/carousel-3.png';
import img4 from '../../assets/login/carousel-4.png';

const images = [img1, img2, img3, img4];

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // Carousel logic: change every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    // Artificial delay for better UX feel
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Credenciales incorrectas. Por favor, intente de nuevo.');
        setIsLoggingIn(false);
      }
    }, 800);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.carousel}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gym motivation ${index + 1}`}
            className={`${styles.carouselImage} ${
              index === currentImageIndex ? styles.carouselImageActive : ''
            }`}
          />
        ))}
        <div className={styles.overlay} />
      </div>

      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logoTitle}>LA 10</h1>
          <p className={styles.logoSubtitle}>FITNESS CLUB</p>
        </div>

        {error && (
          <div className={styles.error}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Correo Electrónico</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
              <input
                type="email"
                className={styles.input}
                placeholder="admin@gym.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Contraseña</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? 'Iniciando...' : (
              <>
                <LogIn size={20} />
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
