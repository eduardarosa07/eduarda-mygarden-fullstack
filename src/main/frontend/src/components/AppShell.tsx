import { useState, type ReactNode } from 'react'

export type PageKey = 'dashboard' | 'secoes' | 'tarefas' | 'plantas' | 'usuarios' | 'permissoes'

type Props = {
  activePage: PageKey
  onNavigate: (page: PageKey) => void
  children: ReactNode
}

const mainItems: Array<{ key: PageKey; label: string; mark: string }> = [
  { key: 'dashboard', label: 'Início', mark: '⌂' },
  { key: 'secoes', label: 'Minhas seções', mark: '◫' },
  { key: 'tarefas', label: 'Tarefas', mark: '✓' },
  { key: 'plantas', label: 'Plantas', mark: '⌁' },
]

const adminItems: Array<{ key: PageKey; label: string; mark: string }> = [
  { key: 'usuarios', label: 'Usuários', mark: '○' },
  { key: 'permissoes', label: 'Permissões', mark: '◇' },
]

export default function AppShell({ activePage, onNavigate, children }: Props) {
  const [open, setOpen] = useState(false)

  function navigate(page: PageKey) {
    onNavigate(page)
    setOpen(false)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Fechar menu">×</button>
        <div className="brand" onClick={() => navigate('dashboard')} role="button" tabIndex={0}>
          <span className="brand-sprout" aria-hidden="true"><i /><b /></span>
          <div>
            <strong>my garden</strong>
            <small>cultive sua rotina</small>
          </div>
        </div>

        <nav className="nav-group" aria-label="Navegação principal">
          {mainItems.map((item) => (
            <button key={item.key} className={activePage === item.key ? 'nav-item active' : 'nav-item'} onClick={() => navigate(item.key)}>
              <span>{item.mark}</span>{item.label}
            </button>
          ))}
        </nav>

        <div className="nav-caption">Administração</div>
        <nav className="nav-group" aria-label="Administração">
          {adminItems.map((item) => (
            <button key={item.key} className={activePage === item.key ? 'nav-item active' : 'nav-item'} onClick={() => navigate(item.key)}>
              <span>{item.mark}</span>{item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="note-leaf" />
          <p>Pequenos cuidados fazem grandes coisas crescerem.</p>
        </div>
      </aside>
      {open && <button className="sidebar-backdrop" onClick={() => setOpen(false)} aria-label="Fechar menu" />}

      <main className="main-area">
        <header className="mobile-header">
          <button className="menu-button" onClick={() => setOpen(true)} aria-label="Abrir menu">☰</button>
          <span>my garden</span>
        </header>
        {children}
      </main>
    </div>
  )
}
