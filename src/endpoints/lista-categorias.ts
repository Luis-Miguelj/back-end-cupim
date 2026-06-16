import type { Context } from 'hono'
import { Categoria } from '@/entities/categorias'

export const listarCategorias = async (c: Context) => {
  const categoria = new Categoria()

  const categorias = await categoria.listarCategorias()

  return c.json({
    categorias
  })
}