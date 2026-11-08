import { Navigate, Outlet, useLocation } from 'react-router-dom'
import type { Usuario } from '../types'

type Props = { usuario: Usuario | null }

export default function ProtectedRoute({ usuario }: Props) {
  const location = useLocation()
  return usuario ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />
}
