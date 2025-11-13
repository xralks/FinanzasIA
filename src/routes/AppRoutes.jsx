import { Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
    </Routes>
  )
}