import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api, { getApiMessage } from '../services/api'
import Feedback from '../components/Feedback'
import type { Usuario } from '../types/Usuario'

export default function UsuarioDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get<Usuario>(`/usuarios/${id}`)
      .then((r) => setUsuario(r.data))
      .catch((err) => setError(getApiMessage(err, 'Usuário não encontrado.')))
  }, [id])

  if (error) return <div className="page"><Feedback message={error} tone="error" /><button className="button button-ghost" onClick={() => navigate('/usuarios')}>Voltar</button></div>
  if (!usuario) return <div className="page"><div className="loading-line">Carregando usuário…</div></div>

  return (
    <div className="page">
      <div className="page-kicker">Detalhe do usuário</div>
      <div className="page-heading"><div><h1>{usuario.nome}</h1><p>Dados do usuário selecionado pela rota /usuarios/:id.</p></div></div>
      <section className="panel detail-card">
        <dl><div><dt>Username</dt><dd>@{usuario.username}</dd></div><div><dt>E-mail</dt><dd>{usuario.email}</dd></div><div><dt>Permissões</dt><dd>{usuario.permissoes?.length ? usuario.permissoes.map((p) => p.nome).join(', ') : 'Nenhuma permissão atribuída'}</dd></div></dl>
        <div className="detail-actions"><button className="button button-ghost" onClick={() => navigate('/usuarios')}>← Voltar</button><Link className="button button-primary link-button" to="/atribuir-permissoes">Atribuir permissões</Link></div>
      </section>
    </div>
  )
}
