import { db } from '@/db'
import { itemPedido, pedido, produto } from '@/db/schema'
import type { ItemPedidoSchema } from '@/utils/type'
import { and, eq } from 'drizzle-orm'

export class ItemPedido {
  async listarPorPedido(idPedido: number) {
    if (!idPedido) {
      return {
        error: "Id do pedido não informado.",
        itens: null
      }
    }

    const itens = await db.select({
      id: itemPedido.id,
      quantidade: itemPedido.quantidade,
      precoUnitario: itemPedido.precoUnitario,
      subTotal: itemPedido.subTotal,
      idPedido: itemPedido.idPedido,
      idProduto: itemPedido.idProduto,
      nomeProduto: produto.nome,
    }).from(itemPedido)
      .innerJoin(produto, eq(itemPedido.idProduto, produto.id))
      .where(eq(itemPedido.idPedido, idPedido))

    if (!itens.length) {
      return {
        error: "Nenhum item encontrado neste pedido.",
        itens: null
      }
    }

    return {
      error: null,
      itens
    }
  }

  async criarItemPedido(data: ItemPedidoSchema) {
    const { idPedido, idProduto, quantidade } = data

    const [order] = await db.select().from(pedido).where(eq(pedido.id, idPedido))

    if (!order) {
      return {
        error: "Pedido não encontrado.",
        message: null
      }
    }

    const [prod] = await db.select().from(produto).where(eq(produto.id, idProduto))

    if (!prod) {
      return {
        error: "Produto não encontrado.",
        message: null
      }
    }

    if (prod.estoque < quantidade) {
      return {
        error: "Estoque insuficiente para este produto.",
        message: null
      }
    }

    const precoUnitario = prod.preco
    const subTotal = quantidade * precoUnitario

    const [existente] = await db.select().from(itemPedido).where(
      and(eq(itemPedido.idPedido, idPedido), eq(itemPedido.idProduto, idProduto))
    )

    if (existente) {
      const novaQuantidade = existente.quantidade + quantidade

      if (prod.estoque < novaQuantidade) {
        return {
          error: "Estoque insuficiente para esta quantidade.",
          message: null
        }
      }

      const novoSubTotal = novaQuantidade * precoUnitario

      await db.update(itemPedido).set({
        quantidade: novaQuantidade,
        precoUnitario,
        subTotal: novoSubTotal,
      }).where(eq(itemPedido.id, existente.id))

      await db.update(pedido).set({
        valorTotal: order.valorTotal + subTotal
      }).where(eq(pedido.id, idPedido))

      await db.update(produto).set({
        estoque: prod.estoque - quantidade
      }).where(eq(produto.id, idProduto))

      return {
        error: null,
        message: "Quantidade atualizada no pedido."
      }
    }

    await db.insert(itemPedido).values({
      idPedido,
      idProduto,
      quantidade,
      precoUnitario,
      subTotal,
    })

    await db.update(pedido).set({
      valorTotal: order.valorTotal + subTotal
    }).where(eq(pedido.id, idPedido))

    await db.update(produto).set({
      estoque: prod.estoque - quantidade
    }).where(eq(produto.id, idProduto))

    return {
      error: null,
      message: "Item adicionado ao pedido."
    }
  }

  async deletarItemPedido(id: number) {
    if (!id) {
      return {
        error: "Id do item não informado.",
        message: null
      }
    }

    const [item] = await db.select().from(itemPedido).where(eq(itemPedido.id, id))

    if (!item) {
      return {
        error: "Item do pedido não encontrado.",
        message: null
      }
    }

    const [order] = await db.select().from(pedido).where(eq(pedido.id, item.idPedido!))

    if (!order) {
      return {
        error: "Pedido não encontrado.",
        message: null
      }
    }

    const [prod] = await db.select().from(produto).where(eq(produto.id, item.idProduto!))

    await db.delete(itemPedido).where(eq(itemPedido.id, id))

    await db.update(pedido).set({
      valorTotal: order.valorTotal - item.subTotal
    }).where(eq(pedido.id, item.idPedido!))

    if (prod) {
      await db.update(produto).set({
        estoque: prod.estoque + item.quantidade
      }).where(eq(produto.id, item.idProduto!))
    }

    return {
      error: null,
      message: "Item removido do pedido."
    }
  }
}
