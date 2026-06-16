import type { Context } from 'hono'
import { Categoria } from '@/entities/categorias'
import { z } from 'zod'

const categorias = z.object({
  nome: z.string().min(1, {
    error: "O nome da categoria deve ter no minimo 1 caractere."
  })
})

export const atualizarCategoria = async (c: Context) => {
  const categoria = new Categoria()
  const id = c.req.param('id') as string
  const data = categorias.parse(await c.req.json())

  const atualizar = await categoria.atualizarCategoria({ id: Number(id), nome: data.nome })

  if (atualizar.error) {
    return c.json({
      error: atualizar.error
    }, 400)
  }

  return c.json({
    message: atualizar.message
  })

}