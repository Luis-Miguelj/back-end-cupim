import { Hono } from 'hono'

//Componentes do Endpoint
import { listarUsuarios } from '@/endpoints/lista-usuarios'
import { cadastroUsuario } from '@/endpoints/cadastro-usuarios'
import { atualizarUsuario } from '@/endpoints/atualizar-usuarios'
import { atualizarCategoria } from '@/endpoints/atualizar-categoria'
import { criarCategoria } from '@/endpoints/cadastro-categorias'
import { login } from '@/endpoints/login'
import { listaProdutos } from '@/endpoints/lista-produtos'
import { cadastroProduto } from '@/endpoints/cadastro-produto'
import { salvarImagem } from '@/endpoints/salvar-imagem'
import { buscarImagens } from '@/endpoints/buscar-imagens'
import { criarPedido } from '@/endpoints/criar-pedido'
import { adicionarItemCarrinho } from '@/endpoints/adicionar-item-carrinho'
import { listarItensCarrinho } from '@/endpoints/listar-itens-carrinho'
import { atualizarItemCarrinho } from '@/endpoints/atualizar-item-carrinho'
import { deletarItemCarrinho } from '@/endpoints/deletar-item-carrinho'
import { adicionarItemPedido } from '@/endpoints/adicionar-item-pedido'
import { listarItensPedido } from '@/endpoints/listar-itens-pedido'
import { deletarItemPedido } from '@/endpoints/deletar-item-pedido'

//JWT
import { jwt } from 'hono/jwt'

import { serveStatic } from 'hono/bun'
import { ZodError } from 'zod'
import { cors } from 'hono/cors'
import { atualizarProduto } from './endpoints/atualizar-produto'

const app = new Hono()


app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

//Middleware
app.use(
  '/api/*',
  jwt({
    secret: process.env.JWT_SECRET!,
    alg: 'HS256',
  }),
)



app.onError((err, c) => {
  if (err instanceof ZodError) {
    return c.json({
      error: "Dados enviados invalidos.",
      details: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    }, 400)
  }

  console.error(err)

  return c.json({
    error: "Erro interno do servidor.",
  }, 500)
})
app.use('/uploads/*', serveStatic({ root: './' }))
//Endpoints
app.get('/api/listar-usuarios', listarUsuarios)
app.get('/produtos', listaProdutos)
app.get('/produtos/:id', listaProdutos)
app.get('/api/buscar-imagens/:id', buscarImagens)
app.post('/api/cadastro-produto', cadastroProduto)
app.post('/cadastro', cadastroUsuario)
app.put('/api/atualizar-usuario/:id', atualizarUsuario)
app.post('/login', login)
app.post('/api/criar-categoria', criarCategoria)
app.post('/api/produtos/:id/imagens', salvarImagem)
app.post('/api/criar-pedido', criarPedido)
app.post('/api/item-carrinho', adicionarItemCarrinho)
app.get('/api/item-carrinho/:idCarrinho', listarItensCarrinho)
app.put('/api/item-carrinho/:id', atualizarItemCarrinho)
app.delete('/api/item-carrinho/:id', deletarItemCarrinho)
app.post('/api/item-pedido', adicionarItemPedido)
app.get('/api/item-pedido/:idPedido', listarItensPedido)
app.delete('/api/item-pedido/:id', deletarItemPedido)
app.put('/api/atualizar-categoria/:id', atualizarCategoria)
app.put('/api/atulizar-produto/:id', atualizarProduto)


export default {
  port: 3333,
  fetch: app.fetch
}
