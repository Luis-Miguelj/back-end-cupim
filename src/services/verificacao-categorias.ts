import { db } from '@/db'
import { categoria } from '@/db/schema'
import { eq } from 'drizzle-orm'
export async function verificacaoCategorias(nome: string) {
  if (!nome) {
    return {
      error: "Dado não preenchido corretamente.",
      message: null
    }
  }

  const [verify] = await db.select().from(categoria).where(eq(categoria.nome, nome.toLowerCase()))

  if (!verify) {
    return false
  }

  return true

}