import type { Context } from 'hono'
import type { login as typeLogin } from '@/utils/type'
import { Users } from '@/entities/usuarios'
import { PayloadJwt } from '@/services/auth'

export const login = async (c: Context) => {
  const users = new Users()
  const data: typeLogin = await c.req.json()


  const { error, usuario } = await users.login(data)

  if (error) {
    return c.json({
      error: error,
      token: null
    }, 400)
  }

  if (!usuario) {
    return c.json({
      error: "Dados do usuário não foram encontrados.",
      token: null
    })
  }

  const role = usuario.admin == true ? 'admin' : 'client'

  const access = await PayloadJwt({
    id: usuario.id,
    email: usuario.email,
    role
  })


  if (access.error) {
    return c.json({
      error: "Não foi possivel gerar o token de acesso.",
      token: null
    }, 400)
  }

  return c.json({
    token: access.token,
    message: access.message
  })
}