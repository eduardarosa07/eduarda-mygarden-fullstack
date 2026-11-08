import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Feedback from '../components/Feedback'
import api, { getApiMessage } from '../services/api'
import { salvarSessao, type Sessao } from '../services/auth'
import type { Usuario, UsuarioPayload } from '../types'

type Props = { onEntrar: (usuario: Usuario) => void }
type Modo = 'login' | 'cadastro'
const cadastroVazio = { nome: '', username: '', email: '', senha: '' }

export default function AcessoPage({ onEntrar }: Props) {
  const navigate = useNavigate()
  const [modo, setModo] = useState<Modo>('login')
  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')
  const [cadastro, setCadastro] = useState(cadastroVazio)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function entrar(event: FormEvent) {
    event.preventDefault(); setMessage(''); setError(''); setEnviando(true)
    try {
      const resposta = await api.post<Sessao>('/login', { username, senha })
      salvarSessao(resposta.data)
      const usuario = await api.get<Usuario>('/me')
      onEntrar(usuario.data)
      navigate('/', { replace: true })
    } catch (err) {
      setError(getApiMessage(err, 'Usuário ou senha inválidos.'))
    } finally { setEnviando(false) }
  }

  async function cadastrar(event: FormEvent) {
    event.preventDefault(); setMessage(''); setError(''); setEnviando(true)
    const dados: UsuarioPayload = { ...cadastro }
    try {
      await api.post('/register', dados)
      setUsername(cadastro.username); setSenha(''); setCadastro(cadastroVazio); setModo('login')
      setMessage('Usuário cadastrado. Agora entre com seu nome de usuário e senha.')
    } catch (err) {
      setError(getApiMessage(err, 'Não foi possível cadastrar o usuário.'))
    } finally { setEnviando(false) }
  }

  return (
    <main className="access-page">
      <section className="access-card">
        <div className="access-brand"><span className="brand-sprout" aria-hidden="true"><i /><b /></span><div><strong>my garden</strong><small>cultive sua rotina</small></div></div>
        {modo === 'login' ? (
          <>
            <div className="access-heading"><span className="eyebrow">Acesso seguro</span><h1>Entrar no My Garden</h1><p>Use seu nome de usuário e sua senha.</p></div>
            <Feedback message={message} tone="success" /><Feedback message={error} tone="error" />
            <form className="access-form" onSubmit={entrar}>
              <label><span>Nome de usuário</span><input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required /></label>
              <label><span>Senha</span><input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="current-password" required /></label>
              <button className="button button-primary access-main-button" type="submit" disabled={enviando}>{enviando ? 'Entrando...' : 'Entrar'}</button>
            </form>
            <div className="access-register"><span>Ainda não possui usuário?</span><button className="button button-ghost" type="button" onClick={() => { setMessage(''); setError(''); setModo('cadastro') }}>Cadastrar usuário</button></div>
          </>
        ) : (
          <>
            <div className="access-heading"><span className="eyebrow pink">Cadastro</span><h1>Cadastrar usuário</h1><p>Preencha seus dados para criar o acesso ao My Garden.</p></div>
            <Feedback message={error} tone="error" />
            <form className="access-form" onSubmit={cadastrar}>
              <label><span>Nome</span><input value={cadastro.nome} onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })} required /></label>
              <label><span>Nome de usuário</span><input value={cadastro.username} onChange={(e) => setCadastro({ ...cadastro, username: e.target.value })} autoComplete="username" required /></label>
              <label><span>E-mail</span><input type="email" value={cadastro.email} onChange={(e) => setCadastro({ ...cadastro, email: e.target.value })} required /></label>
              <label><span>Senha</span><input type="password" minLength={4} value={cadastro.senha} onChange={(e) => setCadastro({ ...cadastro, senha: e.target.value })} autoComplete="new-password" required /></label>
              <button className="button button-primary access-main-button" type="submit" disabled={enviando}>{enviando ? 'Cadastrando...' : 'Cadastrar usuário'}</button>
            </form>
            <button className="text-button access-back" type="button" onClick={() => { setMessage(''); setError(''); setModo('login') }}>← Voltar para entrar</button>
          </>
        )}
      </section>
    </main>
  )
}
