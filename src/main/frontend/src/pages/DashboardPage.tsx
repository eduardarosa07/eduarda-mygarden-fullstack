import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { getApiMessage } from '../services/api'
import type { Habito, Secao, Tarefa, Usuario } from '../types'
import PlantIllustration from '../components/PlantIllustration'
import Feedback from '../components/Feedback'
type Props = { usuarioLogado: Usuario }

function todayIso() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDate(date?: string | null) {
  return date ? date.split('-').reverse().slice(0, 2).join('/') : ''
}

export default function DashboardPage({ usuarioLogado }: Props) {
  const navigate = useNavigate()
  const [secoes, setSecoes] = useState<Secao[]>([])
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [habitos, setHabitos] = useState<Habito[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function carregar() {
    try {
      const [s, t, h] = await Promise.all([
        api.get<Secao[]>('/secoes'),
        api.get<Tarefa[]>('/tarefas'),
        api.get<Habito[]>('/habitos'),
      ])
      setSecoes(s.data)
      setTarefas(t.data)
      setHabitos(h.data)
    } catch (err) {
      setError(getApiMessage(err, 'Não consegui carregar o jardim. Verifique se o Spring Boot está rodando.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { carregar() }, [])

  const secoesUsuario = useMemo(
    () => secoes.filter((s) => s.usuario?.id === usuarioLogado.id),
    [secoes, usuarioLogado.id],
  )
  const tarefasUsuario = useMemo(
    () => tarefas.filter((t) => t.secao?.usuario?.id === usuarioLogado.id),
    [tarefas, usuarioLogado.id],
  )
  const habitosResumo = useMemo(
    () => [...habitos].sort((a, b) => Number(b.ativo) - Number(a.ativo)).slice(0, 3),
    [habitos],
  )
  const tarefasHoje = useMemo(() => tarefasUsuario.filter((t) => t.data === todayIso()), [tarefasUsuario])
  const proximas = useMemo(() => tarefasUsuario
    .filter((t) => !t.concluida && t.data && t.data >= todayIso())
    .sort((a, b) => (a.data ?? '').localeCompare(b.data ?? ''))
    .slice(0, 4), [tarefasUsuario])

  const concluidas = tarefasUsuario.filter((t) => t.concluida).length
  const progressoGeral = tarefasUsuario.length ? Math.round((concluidas / tarefasUsuario.length) * 100) : 0
  const primeiroNome = usuarioLogado.nome.trim().split(/\s+/)[0] || usuarioLogado.nome

  function resumoSecao(secaoId: number) {
    const daSecao = tarefasUsuario.filter((t) => t.secao.id === secaoId)
    return { total: daSecao.length, concluidas: daSecao.filter((t) => t.concluida).length }
  }

  async function toggleTask(tarefa: Tarefa) {
    setError('')
    try {
      await api.patch(`/tarefas/${tarefa.id}/${tarefa.concluida ? 'desmarcar' : 'concluir'}`)
      await carregar()
    } catch (err) {
      setError(getApiMessage(err, 'Não foi possível atualizar a tarefa.'))
    }
  }

  if (loading) return <div className="page"><div className="loading-line">Preparando seu jardim…</div></div>

  return (
    <div className="page home-dashboard-page">
      <div className="home-welcome">
        <div>
          <h1>Olá, {primeiroNome}! <span aria-hidden="true">🌿</span></h1>
          <p>Seu jardim está crescendo a cada conquista.</p>
        </div>
        <button className="button button-primary" onClick={() => navigate('/tarefas')}>+ Nova tarefa</button>
      </div>

      {error && <Feedback message={error} tone="error" />}

      <div className="home-dashboard-grid">
        <div className="home-main-column">
          <section className="home-block">
            <div className="home-section-heading">
              <h2>Meu Jardim</h2>
              <button className="text-button" onClick={() => navigate('/secoes')}>Ver todas</button>
            </div>

            <div className="home-garden-cards">
              {secoesUsuario.slice(0, 3).map((secao) => {
                const resumo = resumoSecao(secao.id)
                return (
                  <button className="home-garden-card" key={secao.id} onClick={() => navigate(`/secoes/${secao.id}`)}>
                    <div className="home-plant-area">
                      <PlantIllustration stage={secao.planta?.estagioCrescimento} progress={secao.planta?.progresso} variant={secao.planta?.id ?? secao.id} size={108} />
                    </div>
                    <strong>{secao.nome}</strong>
                    <span>{resumo.concluidas}/{resumo.total} tarefas</span>
                    <div className="progress-track"><i style={{ width: `${secao.planta?.progresso ?? 0}%` }} /></div>
                  </button>
                )
              })}
              <button className="home-garden-card home-new-section" onClick={() => navigate('/secoes?nova=1')}>
                <span className="new-section-sprout" aria-hidden="true">♧</span>
                <strong>Nova seção</strong>
                <span>Crie uma nova área do seu jardim.</span>
                <b>+</b>
              </button>
            </div>
          </section>

          <section className="home-block home-habits-block">
            <div className="home-section-heading">
              <h2>Meus Hábitos</h2>
              <button className="text-button" onClick={() => navigate('/habitos')}>Ver todos</button>
            </div>

            <div className="home-habit-cards">
              {habitosResumo.map((habito) => (
                <button className="home-habit-card" key={habito.id} onClick={() => navigate('/habitos')}>
                  <div className="home-habit-thumb">
                    {habito.imagem
                      ? <img src={`http://localhost:8080/uploads/habitos/${habito.imagem}`} alt="" />
                      : <span aria-hidden="true">🌿</span>}
                  </div>
                  <div className="home-habit-copy">
                    <div className="home-habit-meta">
                      <span>{habito.frequencia}</span>
                      <em>{habito.ativo ? 'Ativo' : 'Pausado'}</em>
                    </div>
                    <strong>{habito.nome}</strong>
                    <p>{habito.descricao || 'Sem descrição.'}</p>
                  </div>
                </button>
              ))}

              <button className="home-habit-card home-new-habit" onClick={() => navigate('/habitos')}>
                <div className="home-habit-new-icon" aria-hidden="true">＋</div>
                <strong>Novo hábito</strong>
                <p>Crie um hábito para acompanhar sua rotina.</p>
              </button>
            </div>
          </section>

          <section className="home-block home-tasks-block">
            <div className="home-section-heading">
              <h2>Tarefas de hoje</h2>
              <button className="text-button" onClick={() => navigate('/tarefas')}>Ver todas</button>
            </div>
            <div className="home-today-list">
              {tarefasHoje.length === 0 && <div className="home-empty-line">Nenhuma tarefa marcada para hoje.</div>}
              {tarefasHoje.slice(0, 5).map((tarefa) => (
                <div className={`home-task-row ${tarefa.concluida ? 'done' : ''}`} key={tarefa.id}>
                  <button className="round-check" onClick={() => toggleTask(tarefa)} aria-label={tarefa.concluida ? 'Desmarcar tarefa' : 'Concluir tarefa'}>{tarefa.concluida ? '✓' : ''}</button>
                  <div className="home-task-copy">
                    <strong>{tarefa.titulo}</strong>
                    <span>{tarefa.secao.nome}</span>
                  </div>
                  {tarefa.horario && <time>{tarefa.horario.slice(0, 5)}</time>}
                </div>
              ))}
              <button className="home-add-task" onClick={() => navigate('/tarefas')}>＋ Adicionar tarefa</button>
            </div>
          </section>
        </div>

        <aside className="home-side-column">
          <section className="home-quote-card">
            <span>“</span>
            <p>Pequenos cuidados fazem grandes coisas crescerem.</p>
            <div className="quote-plant" aria-hidden="true">🌱</div>
          </section>

          <section className="panel home-reminders-card">
            <div className="home-section-heading compact">
              <h2>Próximos lembretes</h2>
              <button className="text-button" onClick={() => navigate('/tarefas')}>Ver todas</button>
            </div>
            {proximas.length === 0 && <p className="muted">Nada pendente com data próxima.</p>}
            {proximas.map((tarefa) => (
              <div className="home-reminder" key={tarefa.id}>
                <span className="reminder-dot" />
                <div>
                  <strong>{tarefa.titulo}</strong>
                  <small>{formatDate(tarefa.data)}{tarefa.horario ? ` · ${tarefa.horario.slice(0, 5)}` : ''}</small>
                </div>
                <em>{tarefa.secao.nome}</em>
              </div>
            ))}
          </section>

          <section className="panel home-progress-card">
            <div className="home-section-heading compact"><h2>Seu progresso geral</h2></div>
            <div className="home-progress-content">
              <div className="progress-ring" style={{ '--progress': `${progressoGeral}%` } as CSSProperties}>
                <span>{progressoGeral}%</span>
              </div>
              <div>
                <strong>{concluidas} de {tarefasUsuario.length} tarefas</strong>
                <p>concluídas no seu jardim</p>
              </div>
            </div>
            <small className="progress-message">Continue cultivando no seu ritmo. ♡</small>
          </section>
        </aside>
      </div>
    </div>
  )
}
