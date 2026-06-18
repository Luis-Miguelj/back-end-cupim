import { db } from "@/db";
import { categoria, produto } from "@/db/schema";
import type { ProdutoSchema } from "@/utils/type";
import { eq } from "drizzle-orm";

export class Produto {
  async cadastrarProduto(data: ProdutoSchema) {
    if (!data) {
      return {
        error: "Os dados solicitados não foram enviados corretamente.",
        message: null
      }
    }

    const cadastro = await db.insert(produto).values(data)

    if (!cadastro) {
      return {
        error: "Não foi possível cadastrar esse produto.",
        message: null,
      }
    }

    return {
      error: null,
      message: "Produto cadastrado com sucesso."
    }

  }

  async listarProdutos(id?: number) {

    if (!id) {

      const listarProdutos = await db.select({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        estoque: produto.estoque,
        descricao: produto.descricao,
        tipoMadeira: produto.tipoMadeira,
        acabamento: produto.acabamento,
        categoria: categoria.nome
      }).from(produto).innerJoin(categoria, eq(produto.idCategoria, categoria.id))

      if (!listarProdutos) {
        return {
          error: "Erro ao listar todos produtos.",
          produtos: null,
          produto: null
        }
      }

      return {
        error: null,
        produtos: listarProdutos,
        produto: null
      }

    }

    const [listaProdutoId] = await db.select({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      estoque: produto.estoque,
      descricao: produto.descricao,
      tipoMadeira: produto.tipoMadeira,
      acabamento: produto.acabamento,
      categoria: categoria.nome
    }).from(produto).where(eq(produto.id, id)).innerJoin(categoria, eq(produto.idCategoria, categoria.id))

    if (!listaProdutoId) {
      return {
        error: "Erro ao buscar produtos selecionado.",
        produtos: null,
        produto: null
      }
    }

    return {
      error: null,
      produtos: null,
      produto: listaProdutoId
    }

  }

  async editarProduto(idProduto: number, data: ProdutoSchema): Promise<string> {
    if (!idProduto) {
      return "Id do produto não informado."
    }

    if (!data) {
      return "Erro, dados não informados corretamente."
    }

    const [editarProduto] = await db.update(produto).set({ ...data }).where(eq(produto.id, idProduto)).returning()

    if (!editarProduto) return "Erro ao editar o produto"

    return "Produto editado com sucesso."

  }

  async deletarProduto(idProduto: number): Promise<string> {
    await db.delete(produto).where(eq(produto.id, idProduto))
    return "Produto deletado com sucesso."
  }

}