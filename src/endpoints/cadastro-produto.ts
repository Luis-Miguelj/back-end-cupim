import type { Context } from "hono";
import { Produto } from "@/entities/produto";
import { produtoSchema } from "@/utils/type";

export const cadastroProduto = async (c: Context) => {
  const produto = new Produto()
  const data = produtoSchema.parse(await c.req.json())

  const cadastro = await produto.cadastrarProduto(data)

  if (cadastro.error) {
    return c.json({
      error: cadastro.error,
      message: null
    }, 400)
  }

  return c.json({
    error: null,
    message: cadastro.message
  })

}