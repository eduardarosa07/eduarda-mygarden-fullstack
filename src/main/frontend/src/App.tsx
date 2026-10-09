import { useState } from 'react'
import MyGardenPage from './pages/MyGardenPage'
import AcessoPage from './pages/AcessoPage'
import type { Usuario } from './types'
import './App.css'

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null)

  if (!usuarioLogado) {
    return <AcessoPage onEntrar={setUsuarioLogado} />
  }

  return <MyGardenPage usuarioLogado={usuarioLogado} onSair={() => setUsuarioLogado(null)} />
}

export default App
