import z from "zod"

export type usuario = {
  nome: string
  email: string
  senha: string
  endereco?: string | null
  admin?: boolean
}

export type login = {
  email: string,
  senha: string
}

export type categoria = {
  id: number
  nome: string
}

export const produtoSchema = z.object({
  // id: z.number().int().positive().optional(), // Opcional porque é gerado automaticamente
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  preco: z.number().positive("Preço deve ser maior que zero"),
  estoque: z.number().int().nonnegative("Estoque não pode ser negativo"),
  tipoMadeira: z.string().max(100, "Tipo de madeira deve ter no máximo 100 caracteres").min(1, "Tipo de madeira é obrigatório"),
  acabamento: z.string().max(100, "Acabamento deve ter no máximo 100 caracteres").min(1, "Acabamento é obrigatório"),
  idCategoria: z.number().int().positive("ID da categoria deve ser um número positivo")
});

export const createPedidoSchema = z.object({
  valorTotal: z.number({
    error: "O valor total é obrigatório",
  }),
  status: z.string().max(200).default("Em processo"),
  idUsuario: z.number().int().optional(),
});

export const imagemSchema = z.object({
  id: z.number().int().positive().optional(),
  urlImagem: z.string().url().nullable().optional(),
  descricaoAlt: z.string().min(1),
  ordem: z.number().int().nonnegative(),
  idProduto: z.number().int().positive().nullable().optional(),
});

export const carrinhoSchema = z.object({
  idUsuario: z.number().int().positive().nullable().optional(),
  status: z.string().max(200).default('Em processo'),
})

export const listaCarrinhoSchema = z.object({
  id: z.number().int().positive().optional(),
  dataCriacao: z.string().nullable().optional(),
  idUsuario: z.number().int().positive().nullable().optional(),
  status: z.string().max(200).optional().default('Em processo'),
})

export const itemCarrinhoSchema = z.object({
  idCarrinho: z.number().int().positive("Id do carrinho é obrigatório"),
  idProduto: z.number().int().positive("Id do produto é obrigatório"),
  quantidade: z.number().int().positive("Quantidade deve ser maior que zero"),
})

export const editarItemCarrinhoSchema = z.object({
  quantidade: z.number().int().positive("Quantidade deve ser maior que zero"),
})

export const itemPedidoSchema = z.object({
  idPedido: z.number().int().positive("Id do pedido é obrigatório"),
  idProduto: z.number().int().positive("Id do produto é obrigatório"),
  quantidade: z.number().int().positive("Quantidade deve ser maior que zero"),
})

export type ListaCarrinhoSchame = z.infer<typeof listaCarrinhoSchema>
export type Carrinho = z.infer<typeof carrinhoSchema>
export type Imagem = z.infer<typeof imagemSchema>
export type ProdutoSchema = z.infer<typeof produtoSchema>
export type CreatePedidoSchema = z.infer<typeof createPedidoSchema>
export type ItemCarrinhoSchema = z.infer<typeof itemCarrinhoSchema>
export type EditarItemCarrinhoSchema = z.infer<typeof editarItemCarrinhoSchema>
export type ItemPedidoSchema = z.infer<typeof itemPedidoSchema>