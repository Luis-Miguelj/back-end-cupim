import type { Context } from 'hono'
import { Users } from '@/entities/usuarios'
import { usuario } from '@/utils/type'

export const atualizarUsuario = async (c: Context) => {
  const users = new Users()
  const data: usuario = await c.req.json()
  const id = c.req.param('id') as string

  const { error, message } = await users.atualizarUsuario(data, Number(id))

  if (error) {
    return c.json({
      error
    }, 400)
  }

  return c.json({
    message
  })
}