import { useEffect, useState } from 'react'
import Feedback from '../components/Feedback'
import api, { getApiMessage } from '../services/api'
import type { Permissao } from '../types/Permissao'
import type { Usuario } from '../types/Usuario'

export default function UsuarioPermissoesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [permissoes, setPermissoes] = useState<Permissao[]>([])
  const [usuarioId, setUsuarioId] = useState<number | null>(null)
  const [idsSelecionados, setIdsSelecionados] = useState<number[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([api.get<Usuario[]>('/usuarios'), api.get<Permissao[]>('/permissoes')])
      .then(([u, p]) => { setUsuarios(u.data); setPermissoes(p.data) })
      .catch((err) => setError(getApiMessage(err, 'Não foi possível carregar usuários e permissões.')))
  }, [])

  function selecionarUsuario(id: number) {
    setUsuarioId(id || null); setMessage(''); setError('')
    if (!id) { setIdsSelecionados([]); return }
    api.get<Usuario>(`/usuarios/${id}/permissoes`)
      .then((r) => setIdsSelecionados(r.data.permissoes?.map((p) => p.id) ?? []))
      .catch((err) => setError(getApiMessage(err, 'Não foi possível carregar as permissões do usuário.')))
  }

  function alternarPermissao(id: number) {
    setIdsSelecionados((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id])
  }

  async function salvar() {
    if (usuarioId === null) return
    setMessage(''); setError('')
    try { await api.put(`/usuarios/${usuarioId}/permissoes`, idsSelecionados); setMessage('Permissões salvas!') }
    catch (err) { setError(getApiMessage(err, 'Não foi possível salvar as permissões.')) }
  }

  return (
    <div className="page">
      <div className="page-kicker">Administração</div>
      <div className="page-heading"><div><h1>Atribuir permissões</h1><p>Selecione um usuário e marque uma ou mais permissões.</p></div></div>
      <Feedback message={message} tone="success" /><Feedback message={error} tone="error" />
      <section className="panel permission-assignment">
        <label className="assignment-user"><span>Usuário</span><select value={usuarioId ?? ''} onChange={(e) => selecionarUsuario(Number(e.target.value))}><option value="">Selecione...</option>{usuarios.map((u) => <option key={u.id} value={u.id}>{u.nome} ({u.username})</option>)}</select></label>
        <fieldset><legend>Permissões</legend>{permissoes.map((p) => <label className="permission-check" key={p.id}><input type="checkbox" checked={idsSelecionados.includes(p.id)} onChange={() => alternarPermissao(p.id)} /><span><strong>{p.nome}</strong><small>{p.descricao || 'Sem descrição.'}</small></span></label>)}</fieldset>
        <button className="button button-primary" onClick={salvar} disabled={usuarioId === null}>Salvar permissões</button>
      </section>
    </div>
  )
}
