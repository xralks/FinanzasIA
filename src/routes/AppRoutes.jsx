import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RecuperarContraseña from '../pages/RecuperarContraseña'
import ResetPassword from '../pages/ResetPassword'
import MiPanel from '../pages/MiPanel'
import Transacciones from '../pages/Transacciones'
import Ahorros from '../pages/Ahorros'
import HistoriaAPP from '../pages/HistoriaApp'
import Presupuesto from '../pages/Presupuesto'

export default function AppRoutes() {
  return (
    <Routes>
      {/* ========== RUTAS PÚBLICAS ========== */}
      <Route path="/" element={<Inicio />} />
      <Route path="/Inicio-Sesion" element={<Login />} />
      <Route path="/Registro" element={<Register />} />
      <Route path="/Recuperar-Contraseña" element={<RecuperarContraseña />} />
      <Route path="/Reset-Password" element={<ResetPassword />} />
      <Route path="/Historia" element={<HistoriaAPP />} />

      {/* ========== RUTAS PROTEGIDAS (Requieren autenticación) ========== */}
      <Route
        path="/Mi-Panel"
        element={
          <ProtectedRoute>
            <MiPanel />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Transacciones"
        element={
          <ProtectedRoute>
            <Transacciones />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Ahorros"
        element={
          <ProtectedRoute>
            <Ahorros />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Presupuestos"
        element={
          <ProtectedRoute>
            <Presupuesto />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}