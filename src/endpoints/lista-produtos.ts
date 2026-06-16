import type { Context } from "hono";
import { Produto } from "@/entities/produto";

export const listaProdutos = async (c: Context) => {
  const produtos = new Produto()
  const id = c.req.param('id') as string
  if (!id) {
    const data = await produtos.listarProdutos()

    if (data.error) {
      return c.json({
        error: data.error,
        produtos: null
      }, 400)
    }

    return c.json({
      produtos: data.produtos
    })
  }

  const dataPorId = await produtos.listarProdutos(Number(id))

  if (dataPorId.error) {
    return c.json({
      error: dataPorId.error,
      produto: null
    })
  }

  return c.json({
    produto: dataPorId.produto
  })
}