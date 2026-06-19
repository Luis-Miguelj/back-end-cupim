import type { Context } from 'hono'
import { ItensCarrinho } from '@/entities/item-carrinho'

export const listarItensCarrinho = async (c: Context) => {
  const itensCarrinho = new ItensCarrinho()
  const idCarrinho = Number(c.req.param('idCarrinho'))

  const resultado = await itensCarrinho.listarPorCarrinho(idCarrinho)

  if (resultado.error) {
    return c.json({
      error: resultado.error,
      itens: null
    }, 404)
  }

  return c.json({
    error: null,
    itens: resultado.itens
  })
}
