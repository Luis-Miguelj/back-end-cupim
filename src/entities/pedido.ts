import { db } from '@/db'
import { pedido } from '@/db/schema'
import { createPedidoSchema, type CreatePedidoSchema } from '@/utils/type'
import { eq, or } from 'drizzle-orm'
import z from 'zod'

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


  async editarPedido(data: { id: number, valorTotal: number, status: string, dataPedido: Date }) {
    const editarPedidoSchema = z.object({
      id: z.number(),
      valorTotal: z.number(),
      status: z.string().min(1, {
        error: "Campo status é obrigatório."
      }),
      dataPedido: z.date()
    })

    const { id, valorTotal, status, dataPedido } = editarPedidoSchema.parse(data)

    const editar = await db.update(pedido).set({
      status,
      dataPedido: dataPedido.toISOString(),
      valorTotal
    }).where(eq(pedido.id, id))

    if (!editar) {
      return {
        error: "Erro ao editar o pedido.",
        message: null
      }
    }


    return {
      error: null,
      message: "Pedido editado com sucesso."
    }

  }
  async deletarPedido() { }
}