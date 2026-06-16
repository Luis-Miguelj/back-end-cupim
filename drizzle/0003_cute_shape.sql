CREATE TABLE "imagem" (
	"id_imagem" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "imagem_id_imagem_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"url_imagem" text,
	"descricao_alt" varchar NOT NULL,
	"ordem" integer NOT NULL,
	"idProduto" integer
);
--> statement-breakpoint
ALTER TABLE "categoria" RENAME COLUMN "id" TO "id_categoria";--> statement-breakpoint
ALTER TABLE "produto" RENAME COLUMN "id" TO "id_produto";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "id" TO "id_usuario";--> statement-breakpoint
ALTER TABLE "produto" DROP CONSTRAINT "produto_id_categoria_categoria_id_fk";
--> statement-breakpoint
ALTER TABLE "carrinho" ADD COLUMN "id_carrinho" integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY (sequence name "carrinho_id_carrinho_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "carrinho" ADD COLUMN "data_criacao" date;--> statement-breakpoint
ALTER TABLE "carrinho" ADD COLUMN "id_usuario" integer;--> statement-breakpoint
ALTER TABLE "carrinho" ADD COLUMN "status" varchar(200) NOT NULL;--> statement-breakpoint
ALTER TABLE "item_pedido" ADD COLUMN "id_item_pedido" integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY (sequence name "item_pedido_id_item_pedido_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "item_pedido" ADD COLUMN "quantidade" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "item_pedido" ADD COLUMN "preco_unitario" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "item_pedido" ADD COLUMN "sub_total" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "item_pedido" ADD COLUMN "id_pedido" integer;--> statement-breakpoint
ALTER TABLE "item_pedido" ADD COLUMN "id_produto" integer;--> statement-breakpoint
ALTER TABLE "itens_carrinho" ADD COLUMN "id_item_carrinho" integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY (sequence name "itens_carrinho_id_item_carrinho_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "itens_carrinho" ADD COLUMN "quantidade" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "itens_carrinho" ADD COLUMN "preco_unitario" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "itens_carrinho" ADD COLUMN "sub_total" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "itens_carrinho" ADD COLUMN "id_carrinho" integer;--> statement-breakpoint
ALTER TABLE "itens_carrinho" ADD COLUMN "id_produto" integer;--> statement-breakpoint
ALTER TABLE "pedido" ADD COLUMN "id_pedido" integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY (sequence name "pedido_id_pedido_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "pedido" ADD COLUMN "data_pedido" date;--> statement-breakpoint
ALTER TABLE "pedido" ADD COLUMN "valor_total" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "pedido" ADD COLUMN "status" varchar(200) NOT NULL;--> statement-breakpoint
ALTER TABLE "pedido" ADD COLUMN "id_usuario" integer;--> statement-breakpoint
ALTER TABLE "imagem" ADD CONSTRAINT "imagem_idProduto_produto_id_produto_fk" FOREIGN KEY ("idProduto") REFERENCES "public"."produto"("id_produto") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carrinho" ADD CONSTRAINT "carrinho_id_usuario_users_id_usuario_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id_usuario") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_id_pedido_pedido_id_pedido_fk" FOREIGN KEY ("id_pedido") REFERENCES "public"."pedido"("id_pedido") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "item_pedido" ADD CONSTRAINT "item_pedido_id_produto_produto_id_produto_fk" FOREIGN KEY ("id_produto") REFERENCES "public"."produto"("id_produto") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "itens_carrinho" ADD CONSTRAINT "itens_carrinho_id_carrinho_carrinho_id_carrinho_fk" FOREIGN KEY ("id_carrinho") REFERENCES "public"."carrinho"("id_carrinho") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "itens_carrinho" ADD CONSTRAINT "itens_carrinho_id_produto_produto_id_produto_fk" FOREIGN KEY ("id_produto") REFERENCES "public"."produto"("id_produto") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_usuario_users_id_usuario_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."users"("id_usuario") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "produto" ADD CONSTRAINT "produto_id_categoria_categoria_id_categoria_fk" FOREIGN KEY ("id_categoria") REFERENCES "public"."categoria"("id_categoria") ON DELETE no action ON UPDATE no action;