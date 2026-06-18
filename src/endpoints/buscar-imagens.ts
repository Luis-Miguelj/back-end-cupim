import type { Context } from 'hono'
import { Imagens } from '@/entities/imagens'
export const buscarImagens = async (c: Context) => {
  const imagens = new Imagens()

  const idProduto = Number(c.req.param('id'))

  if (!idProduto) {
    return c.json({
      error: "Id do produto não especificado."
    }, 400)
  }

  const resultado = await imagens.buscarImagens(idProduto)
  console.log(resultado)
  if (typeof resultado === 'string') {
    return c.text("Não há imagens vinculadas ao produto.", 400)
  }

  return c.json(resultado)

}