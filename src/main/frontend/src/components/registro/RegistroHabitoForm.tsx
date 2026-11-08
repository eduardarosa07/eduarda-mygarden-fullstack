import { useEffect, useState, type FormEvent } from 'react'
import type { Habito, RegistroHabito, RegistroHabitoPayload } from '../../types'

type Props = { habitos: Habito[]; registroEditando: RegistroHabito | null; onSalvar: (dados: RegistroHabitoPayload) => Promise<void>; onCancelar: () => void }

export default function RegistroHabitoForm({ habitos, registroEditando, onSalvar, onCancelar }: Props) {
  const [form, setForm] = useState<RegistroHabitoPayload>({ habitoId: 0, data: new Date().toISOString().slice(0, 10), concluido: true, observacao: '' })
  useEffect(() => {
    setForm(registroEditando ? { habitoId: registroEditando.habito.id, data: registroEditando.data, concluido: registroEditando.concluido, observacao: registroEditando.observacao ?? '' } : { habitoId: habitos[0]?.id ?? 0, data: new Date().toISOString().slice(0, 10), concluido: true, observacao: '' })
  }, [registroEditando, habitos])
  async function enviar(e: FormEvent) { e.preventDefault(); await onSalvar(form) }
  return <section className="form-panel"><div className="form-intro"><span className="eyebrow pink">{registroEditando ? 'Editando' : 'Novo registro'}</span><h2>{registroEditando ? 'Editar registro' : 'Registrar hábito'}</h2></div><form className="form-grid" onSubmit={enviar}><label><span>Hábito *</span><select value={form.habitoId || ''} onChange={(e) => setForm({ ...form, habitoId: Number(e.target.value) })} required><option value="">Selecione</option>{habitos.map((h) => <option key={h.id} value={h.id}>{h.nome}</option>)}</select></label><label><span>Data *</span><input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required /></label><label className="wide"><span>Observação</span><input maxLength={220} value={form.observacao ?? ''} onChange={(e) => setForm({ ...form, observacao: e.target.value })} placeholder="Ex.: consegui cumprir pela manhã" /></label><label className="checkbox-label"><input type="checkbox" checked={form.concluido} onChange={(e) => setForm({ ...form, concluido: e.target.checked })} /><span>Concluído</span></label><div className="form-actions wide"><button className="button button-primary" type="submit">{registroEditando ? 'Salvar alterações' : 'Cadastrar registro'}</button>{registroEditando && <button className="button button-ghost" type="button" onClick={onCancelar}>Cancelar</button>}</div></form></section>
}
