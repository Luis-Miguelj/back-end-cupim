import type { Context } from 'hono'
import { ItensCarrinho } from '@/entities/item-carrinho'
import { editarItemCarrinhoSchema } from '@/utils/type'

export const atualizarItemCarrinho = async (c: Context) => {
  const itensCarrinho = new ItensCarrinho()
  const id = Number(c.req.param('id'))
  const data = editarItemCarrinhoSchema.parse(await c.req.json())

  const resultado = await itensCarrinho.atualizarItem(id, data)

  if (resultado.error) {
    return c.json({
      error: resultado.error,
      message: null
    }, 400)
  }

  return c.json({
    error: null,
    message: resultado.message
  })
}
