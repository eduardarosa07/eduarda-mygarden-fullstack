import { useEffect, useState, type FormEvent } from 'react'
import type { Secao, SecaoPayload, Usuario } from '../../types'

type Props = {
  secaoEditando: Secao | null
  usuarios: Usuario[]
  onSalvar: (dados: SecaoPayload) => Promise<void>
  onCancelar: () => void
}

const vazio = { nome: '', descricao: '', usuarioId: '' }

export default function SecaoForm({ secaoEditando, usuarios, onSalvar, onCancelar }: Props) {
  const [form, setForm] = useState(vazio)

  useEffect(() => {
    setForm(secaoEditando
      ? { nome: secaoEditando.nome, descricao: secaoEditando.descricao ?? '', usuarioId: String(secaoEditando.usuario.id) }
      : vazio)
  }, [secaoEditando])

  async function enviar(event: FormEvent) {
    event.preventDefault()
    if (!form.usuarioId) return
    await onSalvar({ nome: form.nome, descricao: form.descricao, usuarioId: Number(form.usuarioId) })
  }

  return (
    <section className="form-panel">
      <div className="form-intro">
        <span className="eyebrow pink">{secaoEditando ? 'Editando' : 'Nova seção'}</span>
        <h2>{secaoEditando ? 'Editar seção' : 'Criar uma área do jardim'}</h2>
      </div>
      <form className="form-grid" onSubmit={enviar}>
        <label>
          <span>Nome *</span>
          <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Estudos" required />
        </label>
        <label>
          <span>Usuário *</span>
          <select value={form.usuarioId} onChange={(e) => setForm({ ...form, usuarioId: e.target.value })} required>
            <option value="">Selecione</option>
            {usuarios.map((usuario) => <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>)}
          </select>
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
