import type { Permissao } from '../../types'

type Props = {
  permissao: Permissao
  onEditar: (permissao: Permissao) => void
  onExcluir: (permissao: Permissao) => void
}

export default function PermissaoItem({ permissao, onEditar, onExcluir }: Props) {
  return (
    <article>
      <div>
        <span className="tag">{permissao.nome}</span>
        <p>{permissao.descricao || 'Sem descrição.'}</p>
      </div>
      <div className="card-actions">
        <button onClick={() => onEditar(permissao)}>Editar</button>
        <button className="danger-link" onClick={() => onExcluir(permissao)}>Excluir</button>
      </div>
    </article>
  )
}
