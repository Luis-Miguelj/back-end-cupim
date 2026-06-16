import { db } from '@/db'
import { categoria } from '@/db/schema'
import { eq } from 'drizzle-orm'
export class Categoria {
  async cadastroCategoria({ nome }: { nome: string }) {

    const create = await db.insert(categoria).values({
      nome: nome.toLowerCase()
    })

    if (!create) {
      return {
        error: "Erro ao criar categoria.",
        message: null,
      }
    }

    return {
      error: null,
      message: "Categoria cadastrada com sucesso."
    }

  }

  async listarCategorias() {
    const listaCategorias = await db.select().from(categoria)

    if (!listaCategorias) {
      return {
        error: "Erro ao buscar categorias",
        categorias: null
      }
    }

    return {
      error: null,
      categorias: listaCategorias
    }
  }

  async atualizarCategoria({ id, nome }: { id: number, nome: string }) {
    if (!id) {
      return {
        error: "Id não informado.",
        message: null
      }
    }

    const atualizarCategoria = await db.update(categoria).set({ nome }).where(eq(categoria.id, id))

    if (!atualizarCategoria) {
      return {
        error: "Erro ao atualizar categoria.",
        message: null
      }
    }

    return {
      error: null,
      message: "Categoria atualizada com sucesso."
    }
  }

  async deletarCategoria(id: number) {
    if (!id) {
      return {
        error: "Id não informado.",
        message: null,
      }
    }

    const deletarCategoria = await db.delete(categoria).where(eq(categoria.id, id))

    if (!deletarCategoria) {
      return {
        error: "Erro ao deletar categoria.",
        message: null,
      }
    }

    return {
      error: null,
      message: "Categoria deletada com sucesso."
    }
  }
}