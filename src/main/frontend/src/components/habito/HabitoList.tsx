import type { Habito } from '../../types'
import HabitoItem from './HabitoItem'

type Props = { habitos: Habito[]; onEditar: (h: Habito) => void; onExcluir: (h: Habito) => void }
export default function HabitoList({ habitos, onEditar, onExcluir }: Props) {
  if (!habitos.length) return <div className="empty-state"><strong>Nenhum hábito cadastrado.</strong><p>Crie o primeiro hábito para começar seu acompanhamento.</p></div>
  return <div className="habit-grid">{habitos.map((h) => <HabitoItem key={h.id} habito={h} onEditar={onEditar} onExcluir={onExcluir} />)}</div>
}
