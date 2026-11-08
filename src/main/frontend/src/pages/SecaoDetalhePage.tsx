import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api, { getApiMessage } from '../services/api'
import type { Secao, Tarefa } from '../types'
import PlantIllustration from '../components/PlantIllustration'
import Feedback from '../components/Feedback'

export default function SecaoDetalhePage() {
  const { id } = useParams()
  const secaoId = Number(id)
  const navigate = useNavigate()
  const [secao, setSecao] = useState<Secao | null>(null)
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function carregar() {
    if (!Number.isFinite(secaoId)) { setError('Seção inválida.'); setLoading(false); return }
    setLoading(true)
    try {
      const [s, t] = await Promise.all([api.get<Secao>(`/secoes/${secaoId}`), api.get<Tarefa[]>('/tarefas')])
      setSecao(s.data); setTarefas(t.data.filter((tarefa) => tarefa.secao.id === secaoId))
    } catch (err) { setError(getApiMessage(err, 'Não foi possível carregar esta seção.')) }
    finally { setLoading(false) }
  }

  useEffect(() => { carregar() }, [secaoId])
  const concluidas = useMemo(() => tarefas.filter((t) => t.concluida).length, [tarefas])

  async function toggle(tarefa: Tarefa) {
    try { await api.patch(`/tarefas/${tarefa.id}/${tarefa.concluida ? 'desmarcar' : 'concluir'}`); await carregar() }
    catch (err) { setError(getApiMessage(err, 'Não foi possível atualizar a tarefa.')) }
  }

  if (loading) return <div className="page"><div className="loading-line">Abrindo seção…</div></div>
  if (!secao) return <div className="page"><Feedback message={error || 'Seção não encontrada.'} tone="error" /><button className="button button-ghost" onClick={() => navigate('/secoes')}>Voltar</button></div>

  return (
    <div className="page section-detail-page">
      <button className="back-link" onClick={() => navigate('/secoes')}>← Voltar para minhas seções</button>
      <div className="section-detail-header">
        <div className="section-detail-plant"><PlantIllustration stage={secao.planta?.estagioCrescimento} variant={secao.planta?.id ?? secao.id} size={150} /></div>
        <div className="section-detail-copy"><span className="page-kicker">Seção</span><h1>{secao.nome}</h1><p>{secao.descricao || 'Sem descrição.'}</p><div className="section-detail-progress-line"><span>{concluidas} de {tarefas.length} tarefas concluídas</span><strong>{secao.planta?.progresso ?? 0}%</strong></div><div className="progress-track"><i style={{ width: `${secao.planta?.progresso ?? 0}%` }} /></div></div>
        <button className="button button-primary" onClick={() => navigate('/tarefas', { state: { secaoId: secao.id } })}>+ Nova tarefa</button>
      </div>
      <Feedback message={error} tone="error" />
      <section className="panel section-detail-tasks"><div className="home-section-heading"><h2>Tarefas desta seção</h2><span className="toolbar-count">{tarefas.length} tarefa(s)</span></div>{tarefas.length === 0 && <div className="empty-state text-only"><div><strong>Ainda não há tarefas aqui.</strong><p>Crie a primeira tarefa para começar a cultivar esta seção.</p></div></div>}{tarefas.map((tarefa) => <article className={`task-row ${tarefa.concluida ? 'task-row-done' : ''}`} key={tarefa.id}><button className="round-check" onClick={() => toggle(tarefa)} aria-label={tarefa.concluida ? 'Desmarcar tarefa' : 'Concluir tarefa'}>{tarefa.concluida ? '✓' : ''}</button><div className="task-row-main"><strong>{tarefa.titulo}</strong><small>{tarefa.data ? tarefa.data.split('-').reverse().join('/') : 'Sem data'}{tarefa.horario ? ` · ${tarefa.horario.slice(0, 5)}` : ''}</small>{tarefa.descricao && <p>{tarefa.descricao}</p>}</div></article>)}</section>
    </div>
  )
}
