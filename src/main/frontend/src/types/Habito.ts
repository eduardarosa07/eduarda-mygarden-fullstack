export interface Habito {
  id: number
  nome: string
  descricao?: string | null
  frequencia: string
  ativo: boolean
  imagem?: string | null
}

export interface HabitoPayload {
  nome: string
  descricao?: string
  frequencia: string
  ativo: boolean
}
