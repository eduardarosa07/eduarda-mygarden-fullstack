import { Link } from 'react-router-dom'
import DashboardPage from './DashboardPage'
import type { Usuario } from '../types'

type Props = { usuarioLogado: Usuario }

export default function Home({ usuarioLogado }: Props) {
  return (
    <>
      <DashboardPage usuarioLogado={usuarioLogado} />
      <div className="home-router-shortcuts" aria-label="Atalhos de administração">
        <Link to="/usuarios">Ir para Usuários</Link>
        <Link to="/atribuir-permissoes">Atribuir Permissões</Link>
      </div>
    </>
  )
}
