import type { Habito } from './Habito'

export interface RegistroHabito {
  id: number
  data: string
  concluido: boolean
  observacao?: string | null
  habito: Habito
}

export interface RegistroHabitoPayload {
  habitoId: number
  data: string
  concluido: boolean
  observacao?: string
}
