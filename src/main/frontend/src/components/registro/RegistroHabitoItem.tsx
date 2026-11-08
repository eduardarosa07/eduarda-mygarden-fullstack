import type { RegistroHabito } from '../../types'

type Props = { registro: RegistroHabito; onEditar: (r: RegistroHabito) => void; onExcluir: (r: RegistroHabito) => void }
export default function RegistroHabitoItem({ registro, onEditar, onExcluir }: Props) {
  return <article className="record-row"><div><span className={registro.concluido ? 'record-status done' : 'record-status'}>{registro.concluido ? '✓' : '○'}</span></div><div><strong>{registro.habito.nome}</strong><small>{new Date(`${registro.data}T12:00:00`).toLocaleDateString('pt-BR')}</small><p>{registro.observacao || 'Sem observação.'}</p></div><div className="card-actions"><button onClick={() => onEditar(registro)}>Editar</button><button className="danger-link" onClick={() => onExcluir(registro)}>Excluir</button></div></article>
}
