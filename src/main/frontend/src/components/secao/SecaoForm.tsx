import { useEffect, useState, type FormEvent } from 'react'
import type { Secao, SecaoPayload } from '../../types'

type Props = {
  secaoEditando: Secao | null
  onSalvar: (dados: SecaoPayload) => Promise<void>
  onCancelar: () => void
}

const vazio = { nome: '', descricao: '' }

export default function SecaoForm({ secaoEditando, onSalvar, onCancelar }: Props) {
  const [form, setForm] = useState(vazio)

  useEffect(() => {
    setForm(secaoEditando
      ? { nome: secaoEditando.nome, descricao: secaoEditando.descricao ?? '' }
      : vazio)
  }, [secaoEditando])

  async function enviar(event: FormEvent) {
    event.preventDefault()
    await onSalvar({ nome: form.nome, descricao: form.descricao })
  }

  return (
    <section className="form-panel">
      <div className="form-intro">
        <span className="eyebrow pink">{secaoEditando ? 'Editando' : 'Nova seção'}</span>
        <h2>{secaoEditando ? 'Editar seção' : 'Criar uma área do jardim'}</h2>
      </div>
      <form className="form-grid" onSubmit={enviar}>
        <label className="wide">
          <span>Nome *</span>
          <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Estudos" required />
        </label>
        <label className="wide">
          <span>Descrição</span>
          <input value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Ex.: tarefas e estudos da faculdade" />
        </label>
        <div className="form-actions">
          <button className="button button-primary" type="submit">{secaoEditando ? 'Salvar alterações' : 'Criar seção'}</button>
          {secaoEditando && <button className="button button-ghost" type="button" onClick={onCancelar}>Cancelar</button>}
        </div>
      </form>
    </section>
  )
}
