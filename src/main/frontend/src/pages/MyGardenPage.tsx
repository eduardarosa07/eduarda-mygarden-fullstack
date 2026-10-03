import { useState } from 'react'
import AppShell, { type PageKey } from '../components/AppShell'
import DashboardPage from './DashboardPage'
import SecoesPage from './SecoesPage'
import TarefasPage from './TarefasPage'
import PlantasPage from './PlantasPage'
import UsuariosPage from './UsuariosPage'
import PermissoesPage from './PermissoesPage'

export default function MyGardenPage() {
  const [page, setPage] = useState<PageKey>('dashboard')

  const paginas = {
    dashboard: <DashboardPage onNavigate={setPage} />,
    secoes: <SecoesPage />,
    tarefas: <TarefasPage />,
    plantas: <PlantasPage />,
    usuarios: <UsuariosPage />,
    permissoes: <PermissoesPage />,
  }

  return <AppShell activePage={page} onNavigate={setPage}>{paginas[page]}</AppShell>
}
