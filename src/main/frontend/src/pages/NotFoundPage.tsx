import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return <div className="page not-found"><span className="page-kicker">404</span><h1>Página não encontrada</h1><p>Essa rota não existe no My Garden.</p><Link className="button button-primary link-button" to="/">Voltar ao início</Link></div>
}
