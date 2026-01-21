import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: 'var(--color-text-muted)'
      }}>
        🔄 Verificando sesión...
      </div>
    );
  }

  if (!user) {
    console.log('⚠️ Acceso denegado - Redirigiendo a login');
    return <Navigate to="/Inicio-Sesion" replace />;
  }

  return children;
};

export default ProtectedRoute;