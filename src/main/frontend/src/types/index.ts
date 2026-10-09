export interface Permissao {
  id: number
  nome: string
  descricao?: string | null
}

export interface Usuario {
  id: number
  nome: string
  username: string
  email: string
  permissao?: Permissao | null
}

export type EstagioCrescimento =
  | 'SEMENTE'
  | 'BROTO'
  | 'PLANTA_PEQUENA'
  | 'PLANTA_MEDIA'
  | 'PLANTA_GRANDE'
  | 'FLORESCIMENTO'

export interface Planta {
  id: number
  nome: string
  estagioCrescimento: EstagioCrescimento
  progresso: number
}

export interface Secao {
  id: number
  nome: string
  descricao?: string | null
  usuario: Usuario
  planta?: Planta | null
}

export interface Tarefa {
  id: number
  titulo: string
  descricao?: string | null
  data?: string | null
  horario?: string | null
  concluida: boolean
  secao: Secao
}

export interface UsuarioPayload {
  nome: string
  username: string
  email: string
  senha?: string
  permissaoId?: number | null
}

export interface SecaoPayload {
  nome: string
  descricao?: string
  usuarioId: number
}

export interface TarefaPayload {
  titulo: string
  descricao?: string
  data?: string | null
  horario?: string | null
  concluida?: boolean
  secaoId: number
}
