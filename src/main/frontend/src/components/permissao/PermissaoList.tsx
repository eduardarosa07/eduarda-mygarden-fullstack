import type { Permissao } from '../../types'
import PermissaoItem from './PermissaoItem'

type Props = {
  permissoes: Permissao[]
  onEditar: (permissao: Permissao) => void
  onExcluir: (permissao: Permissao) => void
}

export default function PermissaoList({ permissoes, onEditar, onExcluir }: Props) {
  return (
    <section className="panel permission-list">
      {permissoes.map((permissao) => (
        <PermissaoItem key={permissao.id} permissao={permissao} onEditar={onEditar} onExcluir={onExcluir} />
      ))}
      {permissoes.length === 0 && <div className="table-empty">Nenhuma permissão cadastrada.</div>}
    </section>
  )
}
