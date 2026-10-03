import type { Usuario } from '../../types'
import UsuarioItem from './UsuarioItem'

type Props = {
  usuarios: Usuario[]
  onEditar: (usuario: Usuario) => void
  onExcluir: (usuario: Usuario) => void
}

export default function UsuarioList({ usuarios, onEditar, onExcluir }: Props) {
  return (
    <div className="table-wrap panel">
      <table>
        <thead>
          <tr><th>Nome</th><th>Username</th><th>E-mail</th><th>Permissão</th><th /></tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <UsuarioItem key={usuario.id} usuario={usuario} onEditar={onEditar} onExcluir={onExcluir} />
          ))}
        </tbody>
      </table>
      {usuarios.length === 0 && <div className="table-empty">Nenhum usuário cadastrado.</div>}
    </div>
  )
}
