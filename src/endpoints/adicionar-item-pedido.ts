import type { Context } from 'hono'
import { ItemPedido } from '@/entities/item-pedido'
import { itemPedidoSchema } from '@/utils/type'

export const adicionarItemPedido = async (c: Context) => {
  const itemPedido = new ItemPedido()
  const data = itemPedidoSchema.parse(await c.req.json())

  const resultado = await itemPedido.criarItemPedido(data)

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
