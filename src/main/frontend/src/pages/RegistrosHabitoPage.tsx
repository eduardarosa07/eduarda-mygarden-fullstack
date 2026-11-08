import { useEffect, useState } from 'react'
import Feedback from '../components/Feedback'
import RegistroHabitoForm from '../components/registro/RegistroHabitoForm'
import RegistroHabitoList from '../components/registro/RegistroHabitoList'
import api, { getApiMessage } from '../services/api'
import type { Habito, RegistroHabito, RegistroHabitoPayload } from '../types'

export default function RegistrosHabitoPage() {
  const [habitos, setHabitos] = useState<Habito[]>([])
  const [registros, setRegistros] = useState<RegistroHabito[]>([])
  const [editando, setEditando] = useState<RegistroHabito | null>(null)
  const [formAberto, setFormAberto] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  async function carregar() { try { const [h,r] = await Promise.all([api.get<Habito[]>('/habitos'), api.get<RegistroHabito[]>('/registros-habito')]); setHabitos(h.data); setRegistros(r.data) } catch(e) { setError(getApiMessage(e)) } }
  useEffect(() => { carregar() }, [])
  async function salvar(dados: RegistroHabitoPayload) { try { if (editando) await api.put(`/registros-habito/${editando.id}`, dados); else await api.post('/registros-habito', dados); setMessage(editando ? 'Registro atualizado.' : 'Registro cadastrado.'); setEditando(null); setFormAberto(false); await carregar() } catch(e) { setError(getApiMessage(e)) } }
  async function excluir(r: RegistroHabito) { if (!confirm('Excluir este registro?')) return; try { await api.delete(`/registros-habito/${r.id}`); setMessage('Registro excluído.'); await carregar() } catch(e) { setError(getApiMessage(e)) } }
  return <div className="page"><div className="page-kicker">Acompanhamento</div><div className="page-heading"><div><h1>Registros de hábitos</h1><p>Marque quando um hábito foi realizado e acompanhe sua constância.</p></div><button className="button button-primary" disabled={!habitos.length} onClick={() => { setEditando(null); setFormAberto(true) }}>+ Novo registro</button></div><Feedback message={message} tone="success"/><Feedback message={error} tone="error"/>{!habitos.length && <Feedback message="Cadastre pelo menos um hábito antes de criar registros." tone="error"/>}{formAberto && <RegistroHabitoForm habitos={habitos} registroEditando={editando} onSalvar={salvar} onCancelar={() => { setEditando(null); setFormAberto(false) }}/>}<RegistroHabitoList registros={registros} onEditar={(r) => { setEditando(r); setFormAberto(true); scrollTo({top:0,behavior:'smooth'}) }} onExcluir={excluir}/></div>
}
