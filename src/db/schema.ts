import { boolean, doublePrecision, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  senha: varchar({ length: 255 }).notNull(),
  endereco: varchar({ length: 500 }),
  admin: boolean().$default(() => false)
})

export const produto = pgTable("produto", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar().notNull(),
  descricao: varchar().notNull(),
  preco: doublePrecision().notNull(),
  estoque: integer().notNull(),
  tipoMadeira: varchar("tipo_madeira", { length: 100 }).notNull(),
  acabamento: varchar({ length: 100 }).notNull(),
  idCategoria: integer("id_categoria").notNull().references(() => categoria.id)
})
export const categoria = pgTable("categoria", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar({ length: 150 }).notNull().unique()
})

export const carrinho = pgTable("carrinho", {})
export const itensCarrinho = pgTable("itens_carrinho", {})
export const pedido = pgTable("pedido", {})
export const itemPedido = pgTable("item_pedido", {})
