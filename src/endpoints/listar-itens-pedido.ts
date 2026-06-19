import type { Context } from 'hono'
import { ItemPedido } from '@/entities/item-pedido'

export const listarItensPedido = async (c: Context) => {
  const itemPedido = new ItemPedido()
  const idPedido = Number(c.req.param('idPedido'))

  const resultado = await itemPedido.listarPorPedido(idPedido)

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
