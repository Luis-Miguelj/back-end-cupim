import type { Context } from 'hono'
import { Categoria } from '@/entities/categorias'
import { verificacaoCategorias } from '@/services/verificacao-categorias'

export const criarCategoria = async (c: Context) => {

  const cadastroCategoria = new Categoria()

  const data: { nome: string } = await c.req.json()

  const verify = await verificacaoCategorias(data.nome)

  if (typeof verify == 'boolean' && verify == true) {
    return c.json({
      error: "Essa categoria já existe.",
      message: null
    }, 409)
  }

  const categoria = (typeof verify == 'boolean' && !verify) ? await cadastroCategoria.cadastroCategoria({
    nome: data.nome
  }) : {
    error: "Erro ao cadastrar categoria.",
    message: null
  }

  return categoria.error ? c.json({
    error: categoria.error,
    message: categoria.message
  }, 409) : c.json({
    error: categoria.error,
    message: categoria.message
  })


}