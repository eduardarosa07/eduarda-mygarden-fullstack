import type { Secao } from '../../types'
import SecaoItem from './SecaoItem'

type Props = {
  secoes: Secao[]
  onEditar: (secao: Secao) => void
  onExcluir: (secao: Secao) => void
}

export default function SecaoList({ secoes, onEditar, onExcluir }: Props) {
  return (
    <div className="section-cards">
      {secoes.map((secao) => (
        <SecaoItem key={secao.id} secao={secao} onEditar={onEditar} onExcluir={onExcluir} />
      ))}
      {secoes.length === 0 && (
        <div className="empty-state text-only"><div><strong>Nenhuma seção encontrada.</strong><p>Cadastre uma seção para começar o jardim.</p></div></div>
      )}
    </div>
  )
}
