import type { MouseEvent } from 'react'
import type { Secao } from '../../types'
import PlantIllustration from '../PlantIllustration'

type Props = {
  secao: Secao
  onAbrir: (secao: Secao) => void
  onEditar: (secao: Secao) => void
  onExcluir: (secao: Secao) => void
}

export default function SecaoItem({ secao, onAbrir, onEditar, onExcluir }: Props) {
  function impedir(event: MouseEvent<HTMLButtonElement>, acao: () => void) {
    event.stopPropagation()
    acao()
  }

  return (
    <article className="section-card section-card-clickable" onClick={() => onAbrir(secao)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onAbrir(secao) }}>
      <div className="section-card-plant">
        <PlantIllustration stage={secao.planta?.estagioCrescimento} variant={secao.planta?.id ?? secao.id} size={105} />
      </div>
      <div className="section-card-body">
        <div className="card-title-line">
          <div><small>{secao.usuario.nome}</small><h3>{secao.nome}</h3></div>
          <strong>{secao.planta?.progresso ?? 0}%</strong>
        </div>
        <p>{secao.descricao || 'Sem descrição.'}</p>
        <div className="progress-track"><i style={{ width: `${secao.planta?.progresso ?? 0}%` }} /></div>
        <div className="card-actions">
          <button onClick={(e) => impedir(e, () => onAbrir(secao))}>Ver tarefas</button>
          <button onClick={(e) => impedir(e, () => onEditar(secao))}>Editar</button>
          <button className="danger-link" onClick={(e) => impedir(e, () => onExcluir(secao))}>Excluir</button>
        </div>
      </div>
    </article>
  )
}
