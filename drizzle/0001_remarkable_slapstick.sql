CREATE TABLE "carrinho" (

);
--> statement-breakpoint
CREATE TABLE "categoria" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categoria_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nome" varchar(150) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item_pedido" (

);
--> statement-breakpoint
CREATE TABLE "itens_carrinho" (

);
--> statement-breakpoint
CREATE TABLE "pedido" (

);
--> statement-breakpoint
CREATE TABLE "produto" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "produto_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nome" varchar NOT NULL,
	"descricao" varchar NOT NULL,
	"preco" double precision NOT NULL,
	"estoque" integer NOT NULL,
	"tipo_madeira" varchar(100) NOT NULL,
	"acabamento" varchar(100) NOT NULL,
	"id_categoria" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "senha" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "endereco" varchar(500);--> statement-breakpoint
ALTER TABLE "produto" ADD CONSTRAINT "produto_id_categoria_categoria_id_fk" FOREIGN KEY ("id_categoria") REFERENCES "public"."categoria"("id") ON DELETE no action ON UPDATE no action;