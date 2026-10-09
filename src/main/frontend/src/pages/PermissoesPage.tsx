import { useEffect, useState } from 'react'
import Feedback from '../components/Feedback'
import PermissaoForm from '../components/permissao/PermissaoForm'
import PermissaoList from '../components/permissao/PermissaoList'
import api, { getApiMessage } from '../services/api'
import type { Permissao } from '../types'

type DadosPermissao = { nome: string; descricao: string }

export default function PermissoesPage() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([])
  const [permissaoEditando, setPermissaoEditando] = useState<Permissao | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function carregarPermissoes() {
    try {
      setPermissoes((await api.get<Permissao[]>('/permissoes')).data)
    } catch (err) {
      setError(getApiMessage(err, 'Não foi possível carregar as permissões.'))
    }
  }

  useEffect(() => {
    carregarPermissoes()
  }, [])

  async function salvarPermissao(dados: DadosPermissao) {
    setMessage('')
    setError('')
    try {
      if (permissaoEditando) {
        await api.put(`/permissoes/${permissaoEditando.id}`, dados)
        setMessage('Permissão atualizada.')
      } else {
        await api.post('/permissoes', dados)
        setMessage('Permissão cadastrada.')
      }
      setPermissaoEditando(null)
      await carregarPermissoes()
    } catch (err) {
      setError(getApiMessage(err))
    }
  }

  async function excluirPermissao(permissao: Permissao) {
    if (!window.confirm(`Excluir a permissão “${permissao.nome}”?`)) return
    setMessage('')
    setError('')
    try {
      await api.delete(`/permissoes/${permissao.id}`)
      setMessage('Permissão excluída.')
      if (permissaoEditando?.id === permissao.id) setPermissaoEditando(null)
      await carregarPermissoes()
    } catch (err) {
      setError(getApiMessage(err, 'Não foi possível excluir a permissão.'))
    }
  }

  return (
    <div className="page">
      <div className="page-kicker">Administração</div>
      <div className="page-heading"><div><h1>Permissões</h1><p>Cadastre e gerencie os níveis de acesso.</p></div></div>
      <Feedback message={message} tone="success" />
      <Feedback message={error} tone="error" />

      <div className="two-column-admin">
        <PermissaoForm
          permissaoEditando={permissaoEditando}
          onSalvar={salvarPermissao}
          onCancelar={() => setPermissaoEditando(null)}
        />
        <PermissaoList permissoes={permissoes} onEditar={setPermissaoEditando} onExcluir={excluirPermissao} />
      </div>
    </div>
  )
}
