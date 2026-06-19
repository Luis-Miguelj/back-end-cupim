import type { Context } from 'hono'
import { ItensCarrinho } from '@/entities/item-carrinho'

export const deletarItemCarrinho = async (c: Context) => {
  const itensCarrinho = new ItensCarrinho()
  const id = Number(c.req.param('id'))

  const resultado = await itensCarrinho.deletarItem(id)

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
