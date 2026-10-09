import { useEffect, useState, type FormEvent } from 'react'
import Feedback from '../components/Feedback'
import api, { getApiMessage } from '../services/api'
import type { Permissao, Usuario, UsuarioPayload } from '../types'

type Props = {
  onEntrar: (usuario: Usuario) => void
}

type Modo = 'login' | 'cadastro'

const cadastroVazio = {
  nome: '',
  username: '',
  email: '',
  senha: '',
  permissaoId: '',
}

export default function AcessoPage({ onEntrar }: Props) {
  const [modo, setModo] = useState<Modo>('login')
  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')
  const [cadastro, setCadastro] = useState(cadastroVazio)
  const [permissoes, setPermissoes] = useState<Permissao[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    if (modo !== 'cadastro') return

    api.get<Permissao[]>('/permissoes')
      .then((resposta) => setPermissoes(resposta.data))
      .catch(() => setPermissoes([]))
  }, [modo])

  async function entrar(event: FormEvent) {
    event.preventDefault()
    setMessage('')
    setError('')
    setEnviando(true)

    try {
      const resposta = await api.post<Usuario>('/usuarios/login', { username, senha })
      onEntrar(resposta.data)
    } catch (err) {
      setError(getApiMessage(err, 'Usuário ou senha inválidos.'))
    } finally {
      setEnviando(false)
    }
  }

  async function cadastrar(event: FormEvent) {
    event.preventDefault()
    setMessage('')
    setError('')
    setEnviando(true)

    const dados: UsuarioPayload = {
      nome: cadastro.nome,
      username: cadastro.username,
      email: cadastro.email,
      senha: cadastro.senha,
      permissaoId: cadastro.permissaoId ? Number(cadastro.permissaoId) : null,
    }

    try {
      await api.post('/usuarios', dados)
      setUsername(cadastro.username)
      setSenha('')
      setCadastro(cadastroVazio)
      setModo('login')
      setMessage('Usuário cadastrado. Agora entre com seu nome de usuário e senha.')
    } catch (err) {
      setError(getApiMessage(err, 'Não foi possível cadastrar o usuário.'))
    } finally {
      setEnviando(false)
    }
  }

  function abrirCadastro() {
    setMessage('')
    setError('')
    setModo('cadastro')
  }

  function voltarLogin() {
    setMessage('')
    setError('')
    setModo('login')
  }

  return (
    <main className="access-page">
      <section className="access-card">
        <div className="access-brand">
          <span className="brand-sprout" aria-hidden="true"><i /><b /></span>
          <div>
            <strong>my garden</strong>
            <small>cultive sua rotina</small>
          </div>
        </div>

        {modo === 'login' ? (
          <>
            <div className="access-heading">
              <span className="eyebrow">Acesso</span>
              <h1>Entrar no My Garden</h1>
              <p>Use seu nome de usuário e sua senha.</p>
            </div>

            <Feedback message={message} tone="success" />
            <Feedback message={error} tone="error" />

            <form className="access-form" onSubmit={entrar}>
              <label>
                <span>Nome de usuário</span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </label>

              <label>
                <span>Senha</span>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </label>

              <button className="button button-primary access-main-button" type="submit" disabled={enviando}>
                {enviando ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="access-register">
              <span>Ainda não possui usuário?</span>
              <button className="button button-ghost" type="button" onClick={abrirCadastro}>
                Cadastrar usuário
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="access-heading">
              <span className="eyebrow pink">Cadastro</span>
              <h1>Cadastrar usuário</h1>
              <p>Preencha seus dados para criar o acesso ao My Garden.</p>
            </div>

            <Feedback message={error} tone="error" />

            <form className="access-form" onSubmit={cadastrar}>
              <label>
                <span>Nome</span>
                <input value={cadastro.nome} onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })} required />
              </label>
              <label>
                <span>Nome de usuário</span>
                <input value={cadastro.username} onChange={(e) => setCadastro({ ...cadastro, username: e.target.value })} autoComplete="username" required />
              </label>
              <label>
                <span>E-mail</span>
                <input type="email" value={cadastro.email} onChange={(e) => setCadastro({ ...cadastro, email: e.target.value })} required />
              </label>
              <label>
                <span>Senha</span>
                <input type="password" value={cadastro.senha} onChange={(e) => setCadastro({ ...cadastro, senha: e.target.value })} autoComplete="new-password" required />
              </label>
              <label>
                <span>Permissão</span>
                <select value={cadastro.permissaoId} onChange={(e) => setCadastro({ ...cadastro, permissaoId: e.target.value })}>
                  <option value="">Sem permissão</option>
                  {permissoes.map((permissao) => (
                    <option key={permissao.id} value={permissao.id}>{permissao.nome}</option>
                  ))}
                </select>
              </label>

              <button className="button button-primary access-main-button" type="submit" disabled={enviando}>
                {enviando ? 'Cadastrando...' : 'Cadastrar usuário'}
              </button>
            </form>

            <button className="text-button access-back" type="button" onClick={voltarLogin}>
              ← Voltar para entrar
            </button>
          </>
        )}
      </section>
    </main>
  )
}
