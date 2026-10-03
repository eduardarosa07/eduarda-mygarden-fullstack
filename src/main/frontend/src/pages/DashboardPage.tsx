import { useEffect, useMemo, useState } from 'react'
import api, { getApiMessage } from '../services/api'
import type { Secao, Tarefa } from '../types'
import PlantIllustration from '../components/PlantIllustration'
import Feedback from '../components/Feedback'
import type { PageKey } from '../components/AppShell'

type Props = { onNavigate: (page: PageKey) => void }

function todayIso() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function stageLabel(stage?: string) {
  const labels: Record<string, string> = {
    SEMENTE: 'Semente',
    BROTO: 'Broto',
    PLANTA_PEQUENA: 'Planta pequena',
    PLANTA_MEDIA: 'Planta média',
    PLANTA_GRANDE: 'Planta grande',
    FLORESCIMENTO: 'Florescimento',
  }
  return stage ? labels[stage] ?? stage : 'Semente'
}

export default function DashboardPage({ onNavigate }: Props) {
  const [secoes, setSecoes] = useState<Secao[]>([])
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([api.get<Secao[]>('/secoes'), api.get<Tarefa[]>('/tarefas')])
      .then(([s, t]) => {
        setSecoes(s.data)
        setTarefas(t.data)
      })
      .catch((err) => setError(getApiMessage(err, 'Não consegui carregar o jardim. Verifique se o Spring Boot está rodando.')))
      .finally(() => setLoading(false))
  }, [])

  const tarefasHoje = useMemo(() => tarefas.filter((t) => t.data === todayIso()), [tarefas])
  const pendentes = tarefas.filter((t) => !t.concluida).length
  const media = secoes.length
    ? Math.round(secoes.reduce((sum, s) => sum + (s.planta?.progresso ?? 0), 0) / secoes.length)
    : 0
  const proximas = tarefas
    .filter((t) => !t.concluida && t.data && t.data >= todayIso())
    .sort((a, b) => (a.data ?? '').localeCompare(b.data ?? ''))
    .slice(0, 4)

  if (loading) return <div className="page"><div className="loading-line">Preparando seu jardim…</div></div>

  return (
    <div className="page dashboard-page">
      <div className="page-kicker">Seu espaço de hoje</div>
      <div className="page-heading dashboard-heading">
        <div>
          <h1>Meu jardim</h1>
          <p>Organize suas tarefas por áreas e acompanhe o crescimento de cada planta.</p>
        </div>
        <button className="button button-primary" onClick={() => onNavigate('tarefas')}>+ Nova tarefa</button>
      </div>

      {error && <Feedback message={error} tone="error" />}

      <section className="stats-row" aria-label="Resumo">
        <div className="stat"><span>Tarefas pendentes</span><strong>{pendentes}</strong></div>
        <div className="stat"><span>Seções no jardim</span><strong>{secoes.length}</strong></div>
        <div className="stat"><span>Progresso médio</span><strong>{media}%</strong></div>
      </section>

      <div className="dashboard-grid">
        <section className="panel garden-panel">
          <div className="section-title-row">
            <div><span className="eyebrow">Jardim</span><h2>Como suas áreas estão crescendo</h2></div>
            <button className="text-button" onClick={() => onNavigate('secoes')}>Ver seções</button>
          </div>

          {secoes.length === 0 ? (
            <div className="empty-state compact">
              <PlantIllustration size={90} />
              <div><strong>Seu jardim ainda está vazio.</strong><p>Crie primeiro um usuário e depois sua primeira seção.</p></div>
              <button className="button button-soft" onClick={() => onNavigate('usuarios')}>Começar</button>
            </div>
          ) : (
            <div className="garden-list">
              {secoes.slice(0, 4).map((secao) => (
                <article className="garden-item" key={secao.id}>
                  <PlantIllustration stage={secao.planta?.estagioCrescimento} size={82} />
                  <div className="garden-copy">
                    <div className="garden-name"><strong>{secao.nome}</strong><span>{secao.planta?.progresso ?? 0}%</span></div>
                    <div className="progress-track"><i style={{ width: `${secao.planta?.progresso ?? 0}%` }} /></div>
                    <small>{stageLabel(secao.planta?.estagioCrescimento)}</small>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="panel today-panel">
          <div className="section-title-row">
            <div><span className="eyebrow pink">Hoje</span><h2>Tarefas do dia</h2></div>
            <span className="count-badge">{tarefasHoje.length}</span>
          </div>
          <div className="simple-task-list">
            {tarefasHoje.length === 0 && <p className="muted">Nenhuma tarefa marcada para hoje.</p>}
            {tarefasHoje.slice(0, 5).map((t) => (
              <div className={`simple-task ${t.concluida ? 'done' : ''}`} key={t.id}>
                <span className="task-check">{t.concluida ? '✓' : ''}</span>
                <div><strong>{t.titulo}</strong><small>{t.secao.nome}{t.horario ? ` · ${t.horario.slice(0, 5)}` : ''}</small></div>
              </div>
            ))}
          </div>
          <button className="text-button footer-link" onClick={() => onNavigate('tarefas')}>Abrir todas as tarefas</button>
        </section>

        <section className="panel reminders-panel">
          <div className="section-title-row">
            <div><span className="eyebrow">Próximos</span><h2>Lembretes</h2></div>
          </div>
          {proximas.length === 0 ? <p className="muted">Nada pendente com data próxima.</p> : proximas.map((t) => (
            <div className="reminder-row" key={t.id}>
              <time>{t.data?.split('-').reverse().slice(0, 2).join('/')}</time>
              <div><strong>{t.titulo}</strong><small>{t.secao.nome}</small></div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
