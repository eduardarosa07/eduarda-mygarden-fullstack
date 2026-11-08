import type { Habito } from '../../types'

type Props = { habito: Habito; onEditar: (h: Habito) => void; onExcluir: (h: Habito) => void }

export default function HabitoItem({ habito, onEditar, onExcluir }: Props) {
  return (
    <article className="habit-card">
      <div className="habit-card-image">
        {habito.imagem ? <img src={`http://localhost:8080/uploads/habitos/${habito.imagem}`} alt="" /> : <span>🌿</span>}
      </div>
      <div className="habit-card-body"><div className="card-title-line"><div><small>{habito.frequencia}</small><h3>{habito.nome}</h3></div><span className={`tag ${habito.ativo ? '' : 'tag-muted'}`}>{habito.ativo ? 'Ativo' : 'Pausado'}</span></div><p>{habito.descricao || 'Sem descrição.'}</p><div className="card-actions"><button onClick={() => onEditar(habito)}>Editar</button><button className="danger-link" onClick={() => onExcluir(habito)}>Excluir</button></div></div>
    </article>
  )
}
