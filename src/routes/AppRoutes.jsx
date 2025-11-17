import { Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import { Register } from '../pages/Register'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/Inicio-Sesion" element={<Login />} />
      <Route path="/Registro" element={<Register />} />
    </Routes>
  )
}