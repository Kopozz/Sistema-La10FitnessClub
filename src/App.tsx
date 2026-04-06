import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import MiembrosTable from './components/miembros/MiembrosTable';
import EntrenadoresTable from './components/entrenadores/EntrenadoresTable';
import ClasesTable from './components/clases/ClasesTable';
import CheckInView from './components/checkin/CheckInView';
import PagosTable from './components/pagos/PagosTable';
import PlanesGrid from './components/planes/PlanesGrid';
import Login from './components/login/Login';
import './styles/globals.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
}

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
        />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/miembros" element={<ProtectedRoute><MiembrosTable /></ProtectedRoute>} />
        <Route path="/entrenadores" element={<ProtectedRoute><EntrenadoresTable /></ProtectedRoute>} />
        <Route path="/clases" element={<ProtectedRoute><ClasesTable /></ProtectedRoute>} />
        <Route path="/checkin" element={<ProtectedRoute><CheckInView /></ProtectedRoute>} />
        <Route path="/pagos" element={<ProtectedRoute><PagosTable /></ProtectedRoute>} />
        <Route path="/planes" element={<ProtectedRoute><PlanesGrid /></ProtectedRoute>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

