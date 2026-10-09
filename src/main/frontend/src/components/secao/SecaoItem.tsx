import type { Secao } from '../../types'
import PlantIllustration from '../PlantIllustration'

type Props = {
  secao: Secao
  onEditar: (secao: Secao) => void
  onExcluir: (secao: Secao) => void
}

export default function SecaoItem({ secao, onEditar, onExcluir }: Props) {
  return (
    <article className="section-card">
      <div className="section-card-plant">
        <PlantIllustration stage={secao.planta?.estagioCrescimento} size={105} />
      </div>
      <div className="section-card-body">
        <div className="card-title-line">
          <div><small>{secao.usuario.nome}</small><h3>{secao.nome}</h3></div>
          <strong>{secao.planta?.progresso ?? 0}%</strong>
        </div>
        <p>{secao.descricao || 'Sem descrição.'}</p>
        <div className="progress-track"><i style={{ width: `${secao.planta?.progresso ?? 0}%` }} /></div>
        <div className="card-actions">
          <button onClick={() => onEditar(secao)}>Editar</button>
          <button className="danger-link" onClick={() => onExcluir(secao)}>Excluir</button>
        </div>
      </div>
    </article>
  )
}
