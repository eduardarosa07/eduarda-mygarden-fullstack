import { useEffect, useMemo, useState } from 'react'
import Feedback from '../components/Feedback'
import SecaoForm from '../components/secao/SecaoForm'
import SecaoList from '../components/secao/SecaoList'
import api, { getApiMessage } from '../services/api'
import type { Secao, SecaoPayload, Usuario } from '../types'

export default function SecoesPage() {
  const [secoes, setSecoes] = useState<Secao[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [secaoEditando, setSecaoEditando] = useState<Secao | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function carregarSecoes() {
    setLoading(true)
    try {
      const [secoesResposta, usuariosResposta] = await Promise.all([
        api.get<Secao[]>('/secoes'),
        api.get<Usuario[]>('/usuarios'),
      ])
      setSecoes(secoesResposta.data)
      setUsuarios(usuariosResposta.data)
    } catch (err) {
      setError(getApiMessage(err, 'Não foi possível carregar as seções.'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarSecoes()
  }, [])

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

  return (
    <div className="page">
      <div className="page-kicker">Meu jardim</div>
      <div className="page-heading"><div><h1>Minhas seções</h1><p>Organize as tarefas por áreas do seu jardim.</p></div></div>
      <Feedback message={message} tone="success" />
      <Feedback message={error} tone="error" />

      <SecaoForm
        secaoEditando={secaoEditando}
        usuarios={usuarios}
        onSalvar={salvarSecao}
        onCancelar={() => setSecaoEditando(null)}
      />

      <div className="toolbar">
        <label className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar seções" /></label>
        <span className="toolbar-count">{secoesFiltradas.length} seção(ões)</span>
      </div>

      {loading
        ? <div className="loading-line">Carregando seções…</div>
        : <SecaoList secoes={secoesFiltradas} onEditar={setSecaoEditando} onExcluir={excluirSecao} />}
    </div>
  )
}
