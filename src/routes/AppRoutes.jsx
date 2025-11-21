import { Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RecuperarContraseña from '../pages/RecuperarContraseña'
import ResetPassword from '../pages/ResetPassword'
import MiPanel from '../pages/MiPanel'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/Inicio-Sesion" element={<Login />} />
      <Route path="/Registro" element={<Register />} />
      <Route path="/Recuperar-Contraseña" element={<RecuperarContraseña />} />
      <Route path="/Reset-Password" element={<ResetPassword />} />
      <Route path="/Mi-Panel" element={<MiPanel/>} />
    </Routes>
  )
}