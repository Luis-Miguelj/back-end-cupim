import { db } from '@/db'
import { carrinho } from '@/db/schema'
import { Carrinho as TypeCarrinho, ListaCarrinhoSchame } from '@/utils/type'
import { eq } from 'drizzle-orm'

export class Carrinho {
  async listarCarrinho(): Promise<string | ListaCarrinhoSchame[]> {
    const carrinhos = await db.select().from(carrinho)
    if (!carrinhos || carrinhos.length < 1) {
      return "Não há itens no carrinho."
    }

    return carrinhos
  }

  async adicionarCarrinho(data: TypeCarrinho) {
    if (!data) {
      return {
        error: "Dados não informados corretamente.",
        message: null
      }
    }

    const [adicionar] = await db.insert(carrinho).values({
      status: data.status,
      idUsuario: data.idUsuario,
    }).returning()

    if (!adicionar) return { error: "Não foi possivel adicionar esse produto.", message: null }

    return {
      error: null,
      message: "carrinho criado com sucesso."
    }
  }

  async editarCarrinho(id: number, status: string): Promise<string> {
    if (!id) {
      return "Id não informado."
    }

    const [editarCarrinho] = await db.update(carrinho).set({
      status: !status || status === "" ? 'Em processo' : status
    }).returning()

    if (!editarCarrinho) {
      return "Não foi possível editar o status do carrinho."
    }

    return "Edição bem sucedida."
  }

  async deletarCarrinho(id: number): Promise<string> {
    await db.delete(carrinho).where(eq(carrinho.id, id))

    return "Carrinho deletado."
  }
}