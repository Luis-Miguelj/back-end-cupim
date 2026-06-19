import type { Context } from 'hono'
import { ItensCarrinho } from '@/entities/item-carrinho'
import { itemCarrinhoSchema } from '@/utils/type'

export const adicionarItemCarrinho = async (c: Context) => {
  const itensCarrinho = new ItensCarrinho()
  const data = itemCarrinhoSchema.parse(await c.req.json())

  const resultado = await itensCarrinho.adicionarItem(data)

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
