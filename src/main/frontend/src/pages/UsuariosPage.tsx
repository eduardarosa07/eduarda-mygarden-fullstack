import { useEffect, useState } from 'react'
import Feedback from '../components/Feedback'
import UsuarioForm from '../components/usuario/UsuarioForm'
import UsuarioList from '../components/usuario/UsuarioList'
import api, { getApiMessage } from '../services/api'
import type { Permissao, Usuario, UsuarioPayload } from '../types'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [permissoes, setPermissoes] = useState<Permissao[]>([])
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function carregarUsuarios() {
    setLoading(true)
    try {
      const [usuariosResposta, permissoesResposta] = await Promise.all([
        api.get<Usuario[]>('/usuarios'),
        api.get<Permissao[]>('/permissoes'),
      ])
      setUsuarios(usuariosResposta.data)
      setPermissoes(permissoesResposta.data)
    } catch (err) {
      setError(getApiMessage(err, 'Não foi possível carregar os usuários.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarUsuarios()
  }, [])

  async function salvarUsuario(dados: UsuarioPayload) {
    setMessage('')
    setError('')
    try {
      if (usuarioEditando) {
        await api.put(`/usuarios/${usuarioEditando.id}`, dados)
        setMessage('Usuário atualizado.')
      } else {
        await api.post('/usuarios', dados)
        setMessage('Usuário cadastrado.')
      }
      setUsuarioEditando(null)
      await carregarUsuarios()
    } catch (err) {
      setError(getApiMessage(err))
    }
  }

  async function excluirUsuario(usuario: Usuario) {
    if (!window.confirm(`Excluir o usuário “${usuario.nome}”?`)) return
    setMessage('')
    setError('')
    try {
      await api.delete(`/usuarios/${usuario.id}`)
      setMessage('Usuário excluído.')
      if (usuarioEditando?.id === usuario.id) setUsuarioEditando(null)
      await carregarUsuarios()
    } catch (err) {
      setError(getApiMessage(err))
    }
  }

  return (
    <div className="page">
      <div className="page-kicker">Administração</div>
      <div className="page-heading">
        <div><h1>Usuários</h1><p>Cadastre, liste, edite e exclua usuários.</p></div>
      </div>

      <Feedback message={message} tone="success" />
      <Feedback message={error} tone="error" />

      <UsuarioForm
        usuarioEditando={usuarioEditando}
        permissoes={permissoes}
        onSalvar={salvarUsuario}
        onCancelar={() => setUsuarioEditando(null)}
      />

      {loading
        ? <div className="loading-line">Carregando usuários…</div>
        : <UsuarioList usuarios={usuarios} onEditar={setUsuarioEditando} onExcluir={excluirUsuario} />}
    </div>
  )
}
