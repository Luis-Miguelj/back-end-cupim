import { sign } from 'hono/jwt'
type Payload = {
  id: number
  email: string
  role: string
}
export async function PayloadJwt(data: Payload) {

  const payload = await sign({ sub: data }, process.env.JWT_SECRET!)

  if (!payload) {
    return {
      error: "Não foi possivel gerar o token.",
      message: null,
      success: false,
      token: null
    }
  }

  return {
    error: null,
    message: "Token gerado com sucesso.",
    success: true,
    token: payload
  }
}