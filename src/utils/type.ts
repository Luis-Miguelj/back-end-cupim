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

export type ProdutoSchema = z.infer<typeof produtoSchema>
export type CreatePedidoSchema = z.infer<typeof createPedidoSchema>;