import type { Context } from 'hono'
import { ItemPedido } from '@/entities/item-pedido'

export const deletarItemPedido = async (c: Context) => {
  const itemPedido = new ItemPedido()
  const id = Number(c.req.param('id'))

  const resultado = await itemPedido.deletarItemPedido(id)

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
