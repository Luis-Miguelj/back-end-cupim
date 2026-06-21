import type { Context } from 'hono'
import { Produto } from '@/entities/produto'
import { produtoSchema } from '@/utils/type'

export const atualizarProduto = async (c: Context) => {
  const produto = new Produto()
  const idProduto = Number(c.req.param('id'))
  const data = produtoSchema.parse(await c.req.json())

  if (!idProduto) {
    return c.json({
      error: "Id do produto não informado.",
      message: null
    }, 400)
  }

  const atualizarProduto = await produto.editarProduto(idProduto, data)

  if (!atualizarProduto) {
    return c.text(atualizarProduto, 400)
  }

  return c.text(atualizarProduto)
}