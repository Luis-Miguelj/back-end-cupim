import type { usuario } from "@/utils/type";
// import { RegisterUser } from "@/services/users";
import { Users } from '@/entities/usuarios'
import type { Context } from "hono";

export const cadastroUsuario = async (c: Context) => {
  const users = new Users()
  const data: usuario = await c.req.json()

  if (!data) {
    return c.json({
      error: "Dados não informados corretamente."
    }, { status: 400 })
  }

  const register = await users.cadastro(data)

  if (register.error) {
    return c.json({
      error: register.error,
      message: null
    }, { status: 400 })
  }

  return c.json({
    message: register.message,
    error: null
  })
}