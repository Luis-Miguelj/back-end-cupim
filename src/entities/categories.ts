import { db } from '@/db'
import { categoria } from '@/db/schema'
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
  async listarCategorias() { }
  async atualizarCategoria() { }
  async deletarCategoria() { }
}