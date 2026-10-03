import { useEffect, useState, type FormEvent } from 'react'
import type { Permissao } from '../../types'

type DadosPermissao = { nome: string; descricao: string }

type Props = {
  permissaoEditando: Permissao | null
  onSalvar: (dados: DadosPermissao) => Promise<void>
  onCancelar: () => void
}

const vazio: DadosPermissao = { nome: '', descricao: '' }

export default function PermissaoForm({ permissaoEditando, onSalvar, onCancelar }: Props) {
  const [form, setForm] = useState<DadosPermissao>(vazio)

  useEffect(() => {
    setForm(permissaoEditando
      ? { nome: permissaoEditando.nome, descricao: permissaoEditando.descricao ?? '' }
      : vazio)
  }, [permissaoEditando])

  async function enviar(event: FormEvent) {
    event.preventDefault()
    await onSalvar(form)
  }

  return (
    <section className="form-panel compact-form">
      <div className="form-intro">
        <span className="eyebrow pink">{permissaoEditando ? 'Editando' : 'Nova'}</span>
        <h2>Permissão</h2>
      </div>
      <form className="stack-form" onSubmit={enviar}>
        <label>
          <span>Nome *</span>
          <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
        </label>
        <label>
          <span>Descrição</span>
          <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={4} />
        </label>
        <div className="form-actions">
          <button className="button button-primary" type="submit">{permissaoEditando ? 'Salvar' : 'Criar permissão'}</button>
          {permissaoEditando && <button className="button button-ghost" type="button" onClick={onCancelar}>Cancelar</button>}
        </div>
      </form>
    </section>
  )
}
