import { Link } from 'react-router-dom'
import type { Usuario } from '../../types'

type Props = { usuario: Usuario; onEditar: (usuario: Usuario) => void; onExcluir: (usuario: Usuario) => void }

export default function UsuarioItem({ usuario, onEditar, onExcluir }: Props) {
  return (
    <tr>
      <td><Link className="table-detail-link" to={`/usuarios/${usuario.id}`}><strong>{usuario.nome}</strong></Link></td>
      <td>@{usuario.username}</td>
      <td>{usuario.email}</td>
      <td><div className="tags-inline">{usuario.permissoes?.length ? usuario.permissoes.map((p) => <span className="tag" key={p.id}>{p.nome}</span>) : <span className="tag">—</span>}</div></td>
      <td className="table-actions"><button onClick={() => onEditar(usuario)}>Editar</button><button className="danger-link" onClick={() => onExcluir(usuario)}>Excluir</button></td>
    </tr>
  )
}
