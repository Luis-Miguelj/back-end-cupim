import { Pedidos } from '@/entities/pedido'
import { createPedidoSchema } from '@/utils/type'
import type { Context } from 'hono'

export const criarPedido = async (c: Context) => {
  const pedido = new Pedidos()
  const data = createPedidoSchema.parse(await c.req.json())

  const criarPedido = await pedido.criarPedido(data)

  if (criarPedido.error) {
    return c.json({
      error: criarPedido.error
    }, 400)
  }

  return c.json({
    message: criarPedido.message
  })
}