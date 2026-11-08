import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Feedback from '../components/Feedback'
import SecaoForm from '../components/secao/SecaoForm'
import SecaoList from '../components/secao/SecaoList'
import api, { getApiMessage } from '../services/api'
import type { Secao, SecaoPayload } from '../types'

export default function SecoesPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const iniciarCriacao = searchParams.get('nova') === '1'
  const [secoes, setSecoes] = useState<Secao[]>([])
  const [secaoEditando, setSecaoEditando] = useState<Secao | null>(null)
  const [formAberto, setFormAberto] = useState(iniciarCriacao)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function carregarSecoes() {
    setLoading(true)
    try {
      const resposta = await api.get<Secao[]>('/secoes')
      setSecoes(resposta.data)
    } catch (err) {
      setError(getApiMessage(err, 'Não foi possível carregar as suas seções.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { carregarSecoes() }, [])
  useEffect(() => { if (iniciarCriacao) setFormAberto(true) }, [iniciarCriacao])

  const secoesFiltradas = useMemo(() => {
    const termo = search.trim().toLowerCase()
    if (!termo) return secoes
    return secoes.filter((secao) => `${secao.nome} ${secao.descricao ?? ''}`.toLowerCase().includes(termo))
  }, [secoes, search])

  async function salvarSecao(dados: SecaoPayload) {
    setMessage('')
    setError('')
    try {
      if (secaoEditando) {
        await api.put(`/secoes/${secaoEditando.id}`, dados)
        setMessage('Seção atualizada.')
      } else {
        await api.post('/secoes', dados)
        setMessage('Seção cadastrada.')
      }
      setSecaoEditando(null)
      setFormAberto(false)
      await carregarSecoes()
    } catch (err) {
      setError(getApiMessage(err))
    }
  }

  async function excluirSecao(secao: Secao) {
    if (!window.confirm(`Excluir a seção “${secao.nome}”?`)) return
    setMessage('')
    setError('')
    try {
      await api.delete(`/secoes/${secao.id}`)
      setMessage('Seção excluída.')
      if (secaoEditando?.id === secao.id) setSecaoEditando(null)
      await carregarSecoes()
    } catch (err) {
      setError(getApiMessage(err))
    }
  }

  function novaSecao() {
    setSecaoEditando(null)
    setFormAberto(true)
    setMessage('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function editarSecao(secao: Secao) {
    setSecaoEditando(secao)
    setFormAberto(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function fecharForm() {
    setSecaoEditando(null)
    setFormAberto(false)
    setSearchParams({})
  }

  return (
    <div className="page">
      <div className="page-kicker">Meu jardim</div>
      <div className="page-heading">
        <div><h1>Minhas seções</h1><p>Veja somente as áreas do seu jardim e entre em uma seção para acompanhar suas tarefas.</p></div>
        <button className="button button-primary" onClick={novaSecao}>+ Nova seção</button>
      </div>
      <Feedback message={message} tone="success" />
      <Feedback message={error} tone="error" />

      {formAberto && (
        <div className="section-form-wrap">
          <SecaoForm
            secaoEditando={secaoEditando}
            onSalvar={salvarSecao}
            onCancelar={fecharForm}
          />
          {!secaoEditando && <button className="text-button section-form-close" type="button" onClick={fecharForm}>Fechar cadastro</button>}
        </div>
      )}

      <div className="toolbar">
        <label className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar seções" /></label>
        <span className="toolbar-count">{secoesFiltradas.length} seção(ões)</span>
      </div>

      {loading
        ? <div className="loading-line">Carregando suas seções…</div>
        : <SecaoList secoes={secoesFiltradas} onAbrir={(secao) => navigate(`/secoes/${secao.id}`)} onEditar={editarSecao} onExcluir={excluirSecao} />}
    </div>
  )
}
