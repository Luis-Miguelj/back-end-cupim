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

  async editarProduto() { }
  async deletarProduto() { }

}