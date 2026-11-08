import { useEffect, useState, type FormEvent } from 'react'
import type { Habito, HabitoPayload } from '../../types'

type Props = {
  habitoEditando: Habito | null
  onSalvar: (dados: HabitoPayload, arquivo?: File) => Promise<void>
  onCancelar: () => void
}

const vazio: HabitoPayload = { nome: '', descricao: '', frequencia: 'DIARIO', ativo: true }

export default function HabitoForm({ habitoEditando, onSalvar, onCancelar }: Props) {
  const [form, setForm] = useState<HabitoPayload>(vazio)
  const [arquivo, setArquivo] = useState<File | undefined>()
  const [preview, setPreview] = useState('')

  useEffect(() => {
    setForm(habitoEditando ? {
      nome: habitoEditando.nome,
      descricao: habitoEditando.descricao ?? '',
      frequencia: habitoEditando.frequencia,
      ativo: habitoEditando.ativo,
    } : vazio)
    setArquivo(undefined)
    setPreview(habitoEditando?.imagem ? `http://localhost:8080/uploads/habitos/${habitoEditando.imagem}` : '')
  }, [habitoEditando])

  useEffect(() => {
    if (!arquivo) return
    const url = URL.createObjectURL(arquivo)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [arquivo])

  async function enviar(event: FormEvent) {
    event.preventDefault()
    await onSalvar(form, arquivo)
  }

  return (
    <section className="form-panel">
      <div className="form-intro"><span className="eyebrow pink">{habitoEditando ? 'Editando' : 'Novo hábito'}</span><h2>{habitoEditando ? 'Editar hábito' : 'Criar hábito'}</h2><p>Crie uma rotina simples e acompanhe seus registros.</p></div>
      <form className="form-grid" onSubmit={enviar}>
        <label><span>Nome *</span><input maxLength={80} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Beber água" required /></label>
        <label><span>Frequência *</span><select value={form.frequencia} onChange={(e) => setForm({ ...form, frequencia: e.target.value })}><option value="DIARIO">Diário</option><option value="SEMANAL">Semanal</option><option value="MENSAL">Mensal</option></select></label>
        <label className="wide"><span>Descrição</span><input maxLength={220} value={form.descricao ?? ''} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Ex.: 8 copos por dia" /></label>
        <label><span>Imagem do hábito (opcional)</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setArquivo(e.target.files?.[0])} /></label>
        <label className="checkbox-label"><input type="checkbox" checked={form.ativo} onChange={(e) => setForm({ ...form, ativo: e.target.checked })} /><span>Hábito ativo</span></label>
        {preview && <div className="habit-preview"><img src={preview} alt="Prévia da imagem do hábito" /></div>}
        <div className="form-actions wide"><button className="button button-primary" type="submit">{habitoEditando ? 'Salvar alterações' : 'Cadastrar hábito'}</button>{habitoEditando && <button className="button button-ghost" type="button" onClick={onCancelar}>Cancelar</button>}</div>
      </form>
    </section>
  )
}
