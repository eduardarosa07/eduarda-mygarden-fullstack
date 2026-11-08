import type { Secao } from '../../types'
import SecaoItem from './SecaoItem'

type Props = {
  secoes: Secao[]
  onAbrir: (secao: Secao) => void
  onEditar: (secao: Secao) => void
  onExcluir: (secao: Secao) => void
}

export default function SecaoList({ secoes, onAbrir, onEditar, onExcluir }: Props) {
  return (
    <div className="section-cards">
      {secoes.map((secao) => (
        <SecaoItem key={secao.id} secao={secao} onAbrir={onAbrir} onEditar={onEditar} onExcluir={onExcluir} />
      ))}
      {secoes.length === 0 && (
        <div className="empty-state text-only"><div><strong>Nenhuma seção encontrada.</strong><p>Crie uma seção para começar o jardim.</p></div></div>
      )}
    </div>
  )
}
