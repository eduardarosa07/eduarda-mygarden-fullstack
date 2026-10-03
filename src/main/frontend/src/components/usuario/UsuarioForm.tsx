import { useEffect, useState, type FormEvent } from 'react'
import type { Permissao, Usuario, UsuarioPayload } from '../../types'

type Props = {
  usuarioEditando: Usuario | null
  permissoes: Permissao[]
  onSalvar: (dados: UsuarioPayload) => Promise<void>
  onCancelar: () => void
}

const vazio = { nome: '', username: '', email: '', senha: '', permissaoId: '' }

export default function UsuarioForm({ usuarioEditando, permissoes, onSalvar, onCancelar }: Props) {
  const [form, setForm] = useState(vazio)

  useEffect(() => {
    if (usuarioEditando) {
      setForm({
        nome: usuarioEditando.nome,
        username: usuarioEditando.username,
        email: usuarioEditando.email,
        senha: '',
        permissaoId: usuarioEditando.permissao ? String(usuarioEditando.permissao.id) : '',
      })
    } else {
      setForm(vazio)
    }
  }, [usuarioEditando])

  async function enviar(event: FormEvent) {
    event.preventDefault()
    await onSalvar({
      nome: form.nome,
      username: form.username,
      email: form.email,
      senha: form.senha || undefined,
      permissaoId: form.permissaoId ? Number(form.permissaoId) : null,
    })
  }

  return (
    <section className="form-panel">
      <div className="form-intro">
        <span className="eyebrow pink">{usuarioEditando ? 'Editando' : 'Cadastro'}</span>
        <h2>{usuarioEditando ? 'Editar usuário' : 'Novo usuário'}</h2>
      </div>

      <form className="form-grid" onSubmit={enviar}>
        <label>
          <span>Nome *</span>
          <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
        </label>
        <label>
          <span>Username *</span>
          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        </label>
        <label>
          <span>E-mail *</span>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          <span>{usuarioEditando ? 'Nova senha' : 'Senha *'}</span>
          <input
            type="password"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            required={!usuarioEditando}
            placeholder={usuarioEditando ? 'Deixe vazio para manter a senha' : ''}
          />
        </label>
        <label>
          <span>Permissão</span>
          <select value={form.permissaoId} onChange={(e) => setForm({ ...form, permissaoId: e.target.value })}>
            <option value="">Sem permissão</option>
            {permissoes.map((permissao) => (
              <option key={permissao.id} value={permissao.id}>{permissao.nome}</option>
            ))}
          </select>
        </label>
        <div className="form-actions">
          <button className="button button-primary" type="submit">
            {usuarioEditando ? 'Salvar alterações' : 'Cadastrar usuário'}
          </button>
          {usuarioEditando && (
            <button className="button button-ghost" type="button" onClick={onCancelar}>Cancelar</button>
          )}
        </div>
      </form>
    </section>
  )
}
