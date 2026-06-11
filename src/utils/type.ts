
export type usuario = {
  nome: string
  email: string
  senha: string
  endereco?: string | null
  admin?: boolean
}

export type login = {
  email: string,
  senha: string
}

export type pedido = {}

export type categoria = {
  id: number
  nome: string
}