import type { Context } from 'hono'
import { Imagens } from '@/entities/imagens'
import { mkdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

export const salvarImagem = async (c: Context) => {
  const imagens = new Imagens()
  const idProduto = Number(c.req.param('id'))

  if (!idProduto) {
    return c.json({ error: "Produto inválido." }, 400)
  }

  const body = await c.req.parseBody()
  const file = body['imagem']

  if (!(file instanceof File)) {
    return c.json({ error: 'Imagem não enviada.' }, 400)
  }

  if (!file.type.startsWith('image/')) {
    return c.json({ error: 'Arquivo precisa ser uma imagem.' }, 400)
  }

  const tamanhoMaximo = 5 * 1024 * 1024

  if (file.size > tamanhoMaximo) {
    return c.json({ error: 'Imagem muito grande.' }, 400)
  }

  const extension = extname(file.name)
  const fileName = `${crypto.randomUUID()}${extension}`

  const folder = join('uploads', 'produtos', String(idProduto))
  const path = join(folder, fileName)

  await mkdir(folder, { recursive: true })
  await Bun.write(path, file)

  const urlImagem = `/uploads/produtos/${idProduto}/${fileName}`
  const ordem = await imagens.buscarProximaOrdem(idProduto)

  const imagem = await imagens.salvarImagem({
    urlImagem,
    idProduto,
    ordem,
    descricaoAlt: file.name
  })


  if (imagem.error) {
    return c.json({
      error: imagem.error
    }, 400)
  }

  return c.json({
    error: null,
    message: 'Imagem salva com sucesso.'
  })

}