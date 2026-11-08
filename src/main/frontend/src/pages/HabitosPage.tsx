import { useEffect, useState } from 'react'
import Feedback from '../components/Feedback'
import HabitoForm from '../components/habito/HabitoForm'
import HabitoList from '../components/habito/HabitoList'
import api, { getApiMessage } from '../services/api'
import type { Habito, HabitoPayload } from '../types'

export default function HabitosPage() {
  const [habitos, setHabitos] = useState<Habito[]>([])
  const [editando, setEditando] = useState<Habito | null>(null)
  const [formAberto, setFormAberto] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function carregar() { try { setHabitos((await api.get<Habito[]>('/habitos')).data) } catch (e) { setError(getApiMessage(e)) } }
  useEffect(() => { carregar() }, [])

  async function salvar(dados: HabitoPayload, arquivo?: File) {
    setMessage(''); setError('')
    try {
      const resposta = editando ? await api.put<Habito>(`/habitos/${editando.id}`, dados) : await api.post<Habito>('/habitos', dados)
      if (arquivo) { const fd = new FormData(); fd.append('arquivo', arquivo); await api.post(`/habitos/${resposta.data.id}/imagem`, fd) }
      setMessage(editando ? 'Hábito atualizado.' : 'Hábito cadastrado.')
      setEditando(null); setFormAberto(false); await carregar()
    } catch (e) { setError(getApiMessage(e)) }
  }

  async function excluir(h: Habito) { if (!confirm(`Excluir o hábito “${h.nome}”?`)) return; try { await api.delete(`/habitos/${h.id}`); setMessage('Hábito excluído.'); await carregar() } catch (e) { setError(getApiMessage(e)) } }

  return <div className="page"><div className="page-kicker">N2 · novos modelos</div><div className="page-heading"><div><h1>Hábitos</h1><p>Crie hábitos e acompanhe sua rotina ao longo dos dias.</p></div><button className="button button-primary" onClick={() => { setEditando(null); setFormAberto(true) }}>+ Novo hábito</button></div><Feedback message={message} tone="success"/><Feedback message={error} tone="error"/>{formAberto && <HabitoForm habitoEditando={editando} onSalvar={salvar} onCancelar={() => { setEditando(null); setFormAberto(false) }} />}<HabitoList habitos={habitos} onEditar={(h) => { setEditando(h); setFormAberto(true); scrollTo({top:0,behavior:'smooth'}) }} onExcluir={excluir}/></div>
}
