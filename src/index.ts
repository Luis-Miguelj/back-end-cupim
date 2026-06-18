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

import { zValidator } from '@hono/zod-validator'

//JWT
import { jwt, type JwtVariables } from 'hono/jwt'

import { serveStatic } from 'hono/bun'

const app = new Hono()

//Middleware
app.use(
  '/api/*',
  jwt({
    secret: process.env.JWT_SECRET!,
    alg: 'HS256',
  }),
)

app.onError((err, c) => {
  console.log(err)

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
app.put('/atualizar-usuario/:id', atualizarUsuario)
app.post('/login', login)
app.post('/api/criar-categoria', criarCategoria)
app.post('/api/produtos/:id/imagens', salvarImagem)
app.post('/criar-pedido', criarPedido)
app.put('/teste', atualizarCategoria)

export default app
