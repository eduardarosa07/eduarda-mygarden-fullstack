import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { Usuario } from '../types'
import { temPapel } from '../services/auth'

type Props = {
  usuarioLogado: Usuario
  onSair: () => void | Promise<void>
}

const mainItems = [
  ['/', 'Início', '⌂'],
  ['/secoes', 'Minhas seções', '◫'],
  ['/tarefas', 'Tarefas', '✓'],
  ['/plantas', 'Plantas', '⌁'],
  ['/habitos', 'Hábitos', '♡'],
  ['/registros-habito', 'Registros', '◉'],
] as const

const adminItems = [
  ['/usuarios', 'Usuários', '○'],
  ['/permissoes', 'Permissões', '◇'],
  ['/atribuir-permissoes', 'Atribuir permissões', '⊹'],
] as const

export default function Layout({ usuarioLogado, onSair }: Props) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  async function sair() {
    await onSair()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Fechar menu">×</button>
        <NavLink className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-sprout" aria-hidden="true"><i /><b /></span>
          <div><strong>my garden</strong><small>cultive sua rotina</small></div>
        </NavLink>

        <nav className="nav-group" aria-label="Navegação principal">
          {mainItems.map(([to, label, mark]) => (
            <NavLink key={to} end={to === '/'} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span>{mark}</span>{label}
            </NavLink>
          ))}
        </nav>

        {temPapel('ADMIN') && (<>
          <div className="nav-caption">Administração</div>
          <nav className="nav-group" aria-label="Administração">
            {adminItems.map(([to, label, mark]) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                <span>{mark}</span>{label}
              </NavLink>
            ))}
          </nav>
        </>)}

        <div className="sidebar-account">
          <div><strong>{usuarioLogado.nome}</strong><span>@{usuarioLogado.username}</span></div>
          <button type="button" className="text-button" onClick={sair}>Sair</button>
        </div>
        <div className="sidebar-note"><span className="note-leaf" /><p>Pequenos cuidados fazem grandes coisas crescerem.</p></div>
      </aside>
      {open && <button className="sidebar-backdrop" onClick={() => setOpen(false)} aria-label="Fechar menu" />}

      <main className="main-area">
        <header className="mobile-header">
          <button className="menu-button" onClick={() => setOpen(true)} aria-label="Abrir menu">☰</button>
          <span>my garden</span>
        </header>
        <Outlet />
      </main>
    </div>
  )
}
