import type { RegistroHabito } from '../../types'
import RegistroHabitoItem from './RegistroHabitoItem'

type Props = { registros: RegistroHabito[]; onEditar: (r: RegistroHabito) => void; onExcluir: (r: RegistroHabito) => void }
export default function RegistroHabitoList({ registros, onEditar, onExcluir }: Props) {
  if (!registros.length) return <div className="empty-state"><strong>Nenhum registro encontrado.</strong><p>Registre a realização de um hábito para acompanhar sua constância.</p></div>
  return <div className="record-list">{registros.map((r) => <RegistroHabitoItem key={r.id} registro={r} onEditar={onEditar} onExcluir={onExcluir} />)}</div>
}
