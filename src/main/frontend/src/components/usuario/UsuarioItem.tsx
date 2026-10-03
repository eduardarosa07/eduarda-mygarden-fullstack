import type { Usuario } from '../../types'

type Props = {
  usuario: Usuario
  onEditar: (usuario: Usuario) => void
  onExcluir: (usuario: Usuario) => void
}

export default function UsuarioItem({ usuario, onEditar, onExcluir }: Props) {
  return (
    <tr>
      <td><strong>{usuario.nome}</strong></td>
      <td>@{usuario.username}</td>
      <td>{usuario.email}</td>
      <td><span className="tag">{usuario.permissao?.nome ?? '—'}</span></td>
      <td className="table-actions">
        <button onClick={() => onEditar(usuario)}>Editar</button>
        <button className="danger-link" onClick={() => onExcluir(usuario)}>Excluir</button>
      </td>
    </tr>
  )
}
