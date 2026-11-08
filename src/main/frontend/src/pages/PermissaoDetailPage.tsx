import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api, { getApiMessage } from '../services/api'
import Feedback from '../components/Feedback'
import type { Permissao } from '../types/Permissao'

export default function PermissaoDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [permissao, setPermissao] = useState<Permissao | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get<Permissao>(`/permissoes/${id}`).then((r) => setPermissao(r.data)).catch((err) => setError(getApiMessage(err, 'Permissão não encontrada.')))
  }, [id])

  if (error) return <div className="page"><Feedback message={error} tone="error" /><button className="button button-ghost" onClick={() => navigate('/permissoes')}>Voltar</button></div>
  if (!permissao) return <div className="page"><div className="loading-line">Carregando permissão…</div></div>

  return <div className="page"><div className="page-kicker">Detalhe da permissão</div><div className="page-heading"><div><h1>{permissao.nome}</h1><p>Detalhe acessado pela rota /permissoes/:id.</p></div></div><section className="panel detail-card"><dl><div><dt>ID</dt><dd>{permissao.id}</dd></div><div><dt>Descrição</dt><dd>{permissao.descricao || 'Sem descrição.'}</dd></div></dl><button className="button button-ghost" onClick={() => navigate('/permissoes')}>← Voltar</button></section></div>
}
