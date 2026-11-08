import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import AcessoPage from './pages/AcessoPage'
import Home from './pages/Home'
import SecoesPage from './pages/SecoesPage'
import SecaoDetalhePage from './pages/SecaoDetalhePage'
import TarefasPage from './pages/TarefasPage'
import PlantasPage from './pages/PlantasPage'
import UsuariosPage from './pages/UsuariosPage'
import UsuarioDetailPage from './pages/UsuarioDetailPage'
import PermissoesPage from './pages/PermissoesPage'
import PermissaoDetailPage from './pages/PermissaoDetailPage'
import UsuarioPermissoesPage from './pages/UsuarioPermissoesPage'
import HabitosPage from './pages/HabitosPage'
import RegistrosHabitoPage from './pages/RegistrosHabitoPage'
import NotFoundPage from './pages/NotFoundPage'
import api from './services/api'
import { obterToken, sair as limparSessao } from './services/auth'
import type { Usuario } from './types'
import './App.css'

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null)
  const [verificando, setVerificando] = useState(true)

  useEffect(() => {
    if (!obterToken()) { setVerificando(false); return }
    api.get<Usuario>('/me')
      .then((r) => setUsuarioLogado(r.data))
      .catch(() => { limparSessao(); setUsuarioLogado(null) })
      .finally(() => setVerificando(false))
  }, [])

  function sair() { limparSessao(); setUsuarioLogado(null) }

  if (verificando) return <div className="access-page"><div className="loading-line">Abrindo seu jardim…</div></div>

  return <Routes>
    <Route path="/login" element={usuarioLogado ? <Navigate to="/" replace/> : <AcessoPage onEntrar={setUsuarioLogado}/>} />
    <Route path="/acesso" element={<Navigate to="/login" replace />} />
    <Route element={<ProtectedRoute usuario={usuarioLogado}/> }>
      <Route element={<Layout usuarioLogado={usuarioLogado!} onSair={sair}/> }>
        <Route path="/" element={<Home usuarioLogado={usuarioLogado!}/>} />
        <Route path="/secoes" element={<SecoesPage/>} />
        <Route path="/secoes/:id" element={<SecaoDetalhePage/>} />
        <Route path="/tarefas" element={<TarefasPage/>} />
        <Route path="/plantas" element={<PlantasPage/>} />
        <Route path="/habitos" element={<HabitosPage/>} />
        <Route path="/registros-habito" element={<RegistrosHabitoPage/>} />
        <Route element={<AdminRoute/>}>
          <Route path="/usuarios" element={<UsuariosPage/>} />
          <Route path="/usuarios/:id" element={<UsuarioDetailPage/>} />
          <Route path="/permissoes" element={<PermissoesPage/>} />
          <Route path="/permissoes/:id" element={<PermissaoDetailPage/>} />
          <Route path="/atribuir-permissoes" element={<UsuarioPermissoesPage/>} />
        </Route>
        <Route path="*" element={<NotFoundPage/>} />
      </Route>
    </Route>
  </Routes>
}

export default App
