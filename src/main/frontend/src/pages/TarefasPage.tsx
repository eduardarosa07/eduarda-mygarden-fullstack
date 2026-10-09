import { useEffect, useMemo, useState, type FormEvent } from 'react'
import api, { getApiMessage } from '../services/api'
import type { Secao, Tarefa, TarefaPayload } from '../types'
import Feedback from '../components/Feedback'

const emptyForm = { titulo: '', descricao: '', data: '', horario: '', secaoId: '' }

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [secoes, setSecoes] = useState<Secao[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    try {
      const [t, s] = await Promise.all([api.get<Tarefa[]>('/tarefas'), api.get<Secao[]>('/secoes')])
      setTarefas(t.data); setSecoes(s.data)
    } catch (err) { setError(getApiMessage(err, 'Não foi possível carregar as tarefas.')) }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const visible = useMemo(() => tarefas.filter((t) => {
    const q = search.trim().toLowerCase()
    const text = `${t.titulo} ${t.descricao ?? ''} ${t.secao.nome}`.toLowerCase()
    return !q || text.includes(q)
  }).sort((a, b) => (a.data || '9999').localeCompare(b.data || '9999')), [tarefas, search])

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(''); setMessage('')
    if (!form.secaoId) { setError('Selecione a seção da tarefa.'); return }
    const payload: TarefaPayload = { titulo: form.titulo, descricao: form.descricao, data: form.data || null, horario: form.horario || null, secaoId: Number(form.secaoId), concluida: editingId ? tarefas.find((t) => t.id === editingId)?.concluida : false }
    try {
      if (editingId) await api.put(`/tarefas/${editingId}`, payload)
      else await api.post('/tarefas', payload)
      setMessage(editingId ? 'Tarefa atualizada.' : 'Tarefa adicionada ao jardim.')
      setForm(emptyForm); setEditingId(null); await load()
    } catch (err) { setError(getApiMessage(err)) }
  }

  function edit(t: Tarefa) {
    setEditingId(t.id)
    setForm({ titulo: t.titulo, descricao: t.descricao ?? '', data: t.data ?? '', horario: t.horario?.slice(0, 5) ?? '', secaoId: String(t.secao.id) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function toggle(t: Tarefa) {
    try {
      await api.patch(`/tarefas/${t.id}/${t.concluida ? 'desmarcar' : 'concluir'}`)
      await load()
    } catch (err) { setError(getApiMessage(err)) }
  }

  async function remove(t: Tarefa) {
    if (!window.confirm(`Excluir a tarefa “${t.titulo}”?`)) return
    try { await api.delete(`/tarefas/${t.id}`); setMessage('Tarefa excluída.'); await load() }
    catch (err) { setError(getApiMessage(err)) }
  }

  return (
    <div className="page">
      <div className="page-kicker">Rotina</div>
      <div className="page-heading"><div><h1>Tarefas</h1><p>Cada tarefa concluída alimenta o progresso da seção e muda o estágio da planta.</p></div></div>
      <Feedback message={message} tone="success" /><Feedback message={error} tone="error" />

      <section className="form-panel task-form-panel">
        <div className="form-intro"><span className="eyebrow pink">{editingId ? 'Editando' : 'Nova tarefa'}</span><h2>{editingId ? 'Ajustar tarefa' : 'O que você quer cultivar hoje?'}</h2></div>
        <form className="form-grid" onSubmit={submit}>
          <label><span>Título *</span><input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} placeholder="Ex.: Revisar Java" required /></label>
          <label><span>Seção *</span><select value={form.secaoId} onChange={(e) => setForm({ ...form, secaoId: e.target.value })} required><option value="">Selecione</option>{secoes.map((s) => <option key={s.id} value={s.id}>{s.nome}</option>)}</select></label>
          <label className="wide"><span>Descrição</span><input value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Detalhes opcionais" /></label>
          <label><span>Data</span><input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} /></label>
          <label><span>Horário</span><input type="time" value={form.horario} onChange={(e) => setForm({ ...form, horario: e.target.value })} /></label>
          <div className="form-actions"><button className="button button-primary" type="submit">{editingId ? 'Salvar alterações' : 'Adicionar tarefa'}</button>{editingId && <button className="button button-ghost" type="button" onClick={() => { setEditingId(null); setForm(emptyForm) }}>Cancelar</button>}</div>
        </form>
      </section>

      <div className="toolbar tasks-toolbar">
        <label className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar tarefas" /></label>
      </div>

      {loading ? <div className="loading-line">Carregando tarefas…</div> : (
        <section className="task-list panel">
          {visible.length === 0 && <div className="empty-state text-only"><div><strong>Nenhuma tarefa encontrada.</strong><p>Cadastre uma nova tarefa ou faça outra pesquisa.</p></div></div>}
          {visible.map((t) => (
            <article className={`task-row ${t.concluida ? 'task-row-done' : ''}`} key={t.id}>
              <button className="round-check" onClick={() => toggle(t)} aria-label={t.concluida ? 'Desmarcar tarefa' : 'Concluir tarefa'}>{t.concluida ? '✓' : ''}</button>
              <div className="task-row-main"><strong>{t.titulo}</strong><small>{t.secao.nome}{t.data ? ` · ${t.data.split('-').reverse().join('/')}` : ''}{t.horario ? ` · ${t.horario.slice(0, 5)}` : ''}</small>{t.descricao && <p>{t.descricao}</p>}</div>
              <div className="task-row-actions"><button onClick={() => edit(t)}>Editar</button><button className="danger-link" onClick={() => remove(t)}>Excluir</button></div>
            </article>
          ))}
        </section>
      )}
    </div>
  )
}
