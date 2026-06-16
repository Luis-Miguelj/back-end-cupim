import { db } from '@/db'
import { pedido } from '@/db/schema'
import { createPedidoSchema, type CreatePedidoSchema } from '@/utils/type'
import { eq, or } from 'drizzle-orm'

export class Pedidos {
  async criarPedido(data: CreatePedidoSchema) {
    const { status, valorTotal, idUsuario } = createPedidoSchema.parse(data)

    const criarPedido = await db.insert(pedido).values({
      valorTotal,
      idUsuario,
      status
    })

    if (!criarPedido) {
      return {
        error: "Erro ao criar pedido.",
        message: null
      }
    }

    return {
      error: null,
      message: "Pedido criado com sucesso."
    }
  }

  async listarPedidos(id?: number) {
    if (!id) {
      const listarTodosPedidos = await db.select({
        status: pedido.status,
        valorTotal: pedido.valorTotal,
        dataPedido: pedido.dataPedido,
        idUsuario: pedido.idUsuario
      }).from(pedido)

      if (!listarTodosPedidos) {
        return {
          error: "Erro ao listar todos os pedidos.",
          pedidos: null,
          pedido: null,
        }
      }

      return {
        error: null,
        pedidos: listarTodosPedidos,
        pedido: null
      }
    }

    const [listarPedido] = await db.select({
      status: pedido.status,
      valorTotal: pedido.valorTotal,
      dataPedido: pedido.dataPedido,
      idUsuario: pedido.idUsuario
    }).from(pedido).where(or(eq(pedido.id, id), eq(pedido.idUsuario, id)))

    if (!listarPedido) {
      return {
        error: "Erro ao listar pedido.",
        pedidos: null,
        pedido: null
      }
    }

    return {
      error: null,
      pedidos: null,
      pedido: listarPedido
    }

  }


  async editarPedido() { }
  async deletarPedido() { }
}