import { Navigate, Outlet } from 'react-router-dom'
import { temPapel } from '../services/auth'

export default function AdminRoute() {
  return temPapel('ADMIN') ? <Outlet /> : <Navigate to="/" replace />
}
