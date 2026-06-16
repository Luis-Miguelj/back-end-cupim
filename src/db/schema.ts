import { boolean, date, doublePrecision, integer, pgTable, real, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id_usuario").primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  senha: varchar({ length: 255 }).notNull(),
  endereco: varchar({ length: 500 }),
  admin: boolean().$default(() => false)
})

export const produto = pgTable("produto", {
  id: integer("id_produto").primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar().notNull(),
  descricao: varchar().notNull(),
  preco: doublePrecision().notNull(),
  estoque: integer().notNull(),
  tipoMadeira: varchar("tipo_madeira", { length: 100 }).notNull(),
  acabamento: varchar({ length: 100 }).notNull(),
  idCategoria: integer("id_categoria").notNull().references(() => categoria.id)
})

export const categoria = pgTable("categoria", {
  id: integer("id_categoria").primaryKey().generatedAlwaysAsIdentity(),
  nome: varchar({ length: 150 }).unique().notNull()
})

export const carrinho = pgTable("carrinho", {
  id: integer("id_carrinho").primaryKey().generatedAlwaysAsIdentity(),
  dataCriacao: date("data_criacao").$default(() => new Date().toISOString()),
  idUsuario: integer("id_usuario").references(() => users.id),
  status: varchar({ length: 200 }).notNull().$default(() => 'Em processo')
})

export const itensCarrinho = pgTable("itens_carrinho", {
  id: integer("id_item_carrinho").primaryKey().generatedAlwaysAsIdentity(),
  quantidade: integer().notNull(),
  precoUnitario: doublePrecision("preco_unitario").notNull(),
  subTotal: doublePrecision("sub_total").notNull(),
  idCarrinho: integer("id_carrinho").references(() => carrinho.id),
  idProduto: integer("id_produto").references(() => produto.id)
})

export const pedido = pgTable("pedido", {
  id: integer("id_pedido").primaryKey().generatedAlwaysAsIdentity(),
  dataPedido: date("data_pedido").$default(() => new Date().toISOString()),
  valorTotal: doublePrecision("valor_total").notNull(),
  status: varchar({ length: 200 }).notNull().$default(() => 'Em processo'),
  idUsuario: integer("id_usuario").references(() => users.id)
})

export const itemPedido = pgTable("item_pedido", {
  id: integer("id_item_pedido").primaryKey().generatedAlwaysAsIdentity(),
  quantidade: integer().notNull(),
  precoUnitario: doublePrecision("preco_unitario").notNull(),
  subTotal: doublePrecision("sub_total").notNull(),
  idPedido: integer("id_pedido").references(() => pedido.id),
  idProduto: integer("id_produto").references(() => produto.id)
})

export const imagem = pgTable("imagem", {
  id: integer("id_imagem").primaryKey().generatedAlwaysAsIdentity(),
  urlImagem: text("url_imagem"),
  descricaoAlt: varchar("descricao_alt").notNull(),
  ordem: integer().notNull(),
  idProduto: integer().references(() => produto.id)
})