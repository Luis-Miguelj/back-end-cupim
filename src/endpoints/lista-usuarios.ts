import type { Context } from "hono"
import { Users } from "@/entities/usuarios"
export const listarUsuarios = async (c: Context) => {
  const users = new Users()
  const { usuarios, error } = await users.listarUsuarios()

  if (error) {
    return c.json({
      error,
      usuarios: null
    })
  }

  return c.json({
    usuarios
  })
}