import type { Context } from 'hono'
import { Categoria } from '@/entities/categories'
import { verificacaoCategorias } from '@/services/verificacao-categorias'

export const criarCategoria = async (c: Context) => {

  const category = new Categoria()

  const data: { nome: string } = await c.req.json()

  const verify = await verificacaoCategorias(data.nome)

  if (typeof verify == 'boolean' && verify == true) {
    return c.json({
      error: "Essa categoria já existe.",
      message: null
    }, 401)
  }

  const categoria = await category.cadastroCategoria({
    nome: data.nome
  })

  return categoria.error ? c.json({
    error: categoria.error,
    message: categoria.message
  }, 400) : c.json({
    error: categoria.error,
    message: categoria.message
  })


}