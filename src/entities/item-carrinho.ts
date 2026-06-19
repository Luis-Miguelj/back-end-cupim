import { db } from '@/db'
import { carrinho, itensCarrinho, produto } from '@/db/schema'
import type { EditarItemCarrinhoSchema, ItemCarrinhoSchema } from '@/utils/type'
import { and, eq } from 'drizzle-orm'

export class ItensCarrinho {
  async listarPorCarrinho(idCarrinho: number) {
    if (!idCarrinho) {
      return {
        error: "Id do carrinho não informado.",
        itens: null
      }
    }

    const itens = await db.select({
      id: itensCarrinho.id,
      quantidade: itensCarrinho.quantidade,
      precoUnitario: itensCarrinho.precoUnitario,
      subTotal: itensCarrinho.subTotal,
      idCarrinho: itensCarrinho.idCarrinho,
      idProduto: itensCarrinho.idProduto,
      nomeProduto: produto.nome,
    }).from(itensCarrinho)
      .innerJoin(produto, eq(itensCarrinho.idProduto, produto.id))
      .where(eq(itensCarrinho.idCarrinho, idCarrinho))

    if (!itens.length) {
      return {
        error: "Nenhum item encontrado no carrinho.",
        itens: null
      }
    }

    return {
      error: null,
      itens
    }
  }

  async adicionarItem(data: ItemCarrinhoSchema) {
    const { idCarrinho, idProduto, quantidade } = data

    const [cart] = await db.select().from(carrinho).where(eq(carrinho.id, idCarrinho))

    if (!cart) {
      return {
        error: "Carrinho não encontrado.",
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

    const [existente] = await db.select().from(itensCarrinho).where(
      and(eq(itensCarrinho.idCarrinho, idCarrinho), eq(itensCarrinho.idProduto, idProduto))
    )

    if (existente) {
      const novaQuantidade = existente.quantidade + quantidade

      if (prod.estoque < novaQuantidade) {
        return {
          error: "Estoque insuficiente para esta quantidade.",
          message: null
        }
      }

      await db.update(itensCarrinho).set({
        quantidade: novaQuantidade,
        precoUnitario,
        subTotal: novaQuantidade * precoUnitario,
      }).where(eq(itensCarrinho.id, existente.id))

      return {
        error: null,
        message: "Quantidade atualizada no carrinho."
      }
    }

    await db.insert(itensCarrinho).values({
      idCarrinho,
      idProduto,
      quantidade,
      precoUnitario,
      subTotal: quantidade * precoUnitario,
    })

    return {
      error: null,
      message: "Item adicionado ao carrinho."
    }
  }

  async atualizarItem(id: number, data: EditarItemCarrinhoSchema) {
    if (!id) {
      return {
        error: "Id do item não informado.",
        message: null
      }
    }

    const [item] = await db.select().from(itensCarrinho).where(eq(itensCarrinho.id, id))

    if (!item) {
      return {
        error: "Item do carrinho não encontrado.",
        message: null
      }
    }

    const [prod] = await db.select().from(produto).where(eq(produto.id, item.idProduto!))

    if (!prod) {
      return {
        error: "Produto não encontrado.",
        message: null
      }
    }

    if (prod.estoque < data.quantidade) {
      return {
        error: "Estoque insuficiente para esta quantidade.",
        message: null
      }
    }

    const precoUnitario = prod.preco

    await db.update(itensCarrinho).set({
      quantidade: data.quantidade,
      precoUnitario,
      subTotal: data.quantidade * precoUnitario,
    }).where(eq(itensCarrinho.id, id))

    return {
      error: null,
      message: "Item do carrinho atualizado com sucesso."
    }
  }

  async deletarItem(id: number) {
    if (!id) {
      return {
        error: "Id do item não informado.",
        message: null
      }
    }

    const deletar = await db.delete(itensCarrinho).where(eq(itensCarrinho.id, id))

    if (!deletar) {
      return {
        error: "Erro ao remover item do carrinho.",
        message: null
      }
    }

    return {
      error: null,
      message: "Item removido do carrinho."
    }
  }
}
