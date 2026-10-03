import { useEffect, useState } from 'react'
import api, { getApiMessage } from '../services/api'
import type { Planta } from '../types'
import PlantIllustration from '../components/PlantIllustration'
import Feedback from '../components/Feedback'

const stageLabels: Record<string, string> = {
  SEMENTE: 'Semente',
  BROTO: 'Broto',
  PLANTA_PEQUENA: 'Planta pequena',
  PLANTA_MEDIA: 'Planta média',
  PLANTA_GRANDE: 'Planta grande',
  FLORESCIMENTO: 'Florescimento',
}

export default function PlantasPage() {
  const [plantas, setPlantas] = useState<Planta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get<Planta[]>('/plantas')
      .then((r) => setPlantas(r.data))
      .catch((err) => setError(getApiMessage(err, 'Não foi possível carregar as plantas.')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <div className="page-kicker">Crescimento</div>
      <div className="page-heading"><div><h1>Plantas</h1><p>O estágio de cada planta é calculado pelo percentual de tarefas concluídas na seção.</p></div></div>
      <Feedback message={error} tone="error" />
      {loading ? <div className="loading-line">Observando o jardim…</div> : (
        <div className="plants-grid">
          {plantas.length === 0 && <div className="empty-state"><PlantIllustration size={100} /><div><strong>Ainda não há plantas.</strong><p>Uma planta nasce automaticamente quando você cria uma seção.</p></div></div>}
          {plantas.map((planta) => (
            <article className="plant-card" key={planta.id}>
              <div className="plant-card-visual"><PlantIllustration stage={planta.estagioCrescimento} size={145} /></div>
              <div><span className="eyebrow">{stageLabels[planta.estagioCrescimento]}</span><h3>{planta.nome}</h3><p>{planta.progresso}% de progresso</p></div>
              <div className="progress-track"><i style={{ width: `${planta.progresso}%` }} /></div>
            </article>
          ))}
        </div>
      )}
      <section className="growth-guide">
        <h2>Como funciona o crescimento</h2>
        <div className="growth-steps">
          {[
            ['0%', 'Semente'], ['1–25%', 'Broto'], ['26–50%', 'Planta pequena'], ['51–75%', 'Planta média'], ['76–99%', 'Planta grande'], ['100%', 'Florescimento'],
          ].map(([range, label]) => <div key={range}><strong>{range}</strong><span>{label}</span></div>)}
        </div>
      </section>
    </div>
  )
}
