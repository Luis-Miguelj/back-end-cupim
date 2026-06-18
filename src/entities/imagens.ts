import { db } from '@/db'
import { imagem } from '@/db/schema'
import type { Imagem } from '@/utils/type'
import { desc, eq } from 'drizzle-orm'

export class Imagens {

  async buscarProximaOrdem(idProduto: number) {
    const [ultimaImagem] = await db
      .select({ ordem: imagem.ordem })
      .from(imagem)
      .where(eq(imagem.idProduto, idProduto))
      .orderBy(desc(imagem.ordem))
      .limit(1)

    return ultimaImagem ? ultimaImagem.ordem + 1 : 1
  }

  async salvarImagem({ id, urlImagem, descricaoAlt, ordem, idProduto }: { id?: number, urlImagem: string, descricaoAlt: string, ordem: number, idProduto: number }) {

    if (!idProduto || !urlImagem || !descricaoAlt) {
      return {
        error: "Paramentros não enviados corretamente.",
        message: null
      }
    }

    await db.insert(imagem).values({
      urlImagem,
      descricaoAlt,
      ordem,
      idProduto
    })

    return {
      error: null,
      message: "Imagem salva com sucesso.",
      // urlImagem
    }

  }

  async buscarImagens(idProduto: number): Promise<string | Imagem[]> {
    const imagens = await db.select().from(imagem).where(eq(imagem.idProduto, idProduto))

    if (!imagens || imagens.length < 1) {
      return "Imagens não encontradas."
    }

    // console.log(!imagens ? 'oi' : imagens)
    // if (imagens.length > 0) {
    //   return "Não há imagens vinculadas à esse produto."
    // }

    return imagens
  }
}