import { Link } from 'react-router-dom'
import type { Permissao } from '../../types'

type Props = { permissao: Permissao; onEditar: (permissao: Permissao) => void; onExcluir: (permissao: Permissao) => void }

export default function PermissaoItem({ permissao, onEditar, onExcluir }: Props) {
  return (
    <article className="permission-item">
      <div><Link className="permission-detail-link" to={`/permissoes/${permissao.id}`}><span className="tag">{permissao.nome}</span></Link><p>{permissao.descricao || 'Sem descrição.'}</p></div>
      <div className="permission-actions"><button onClick={() => onEditar(permissao)}>Editar</button><button className="danger-link" onClick={() => onExcluir(permissao)}>Excluir</button></div>
    </article>
  )
}
