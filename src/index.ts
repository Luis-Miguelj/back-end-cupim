import { Hono } from 'hono'

//Componentes do Endpoint
import { listarUsuarios } from '@/endpoints/lista-usuarios'
import { cadastroUsuario } from '@/endpoints/cadastro-usuarios'
import { atualizarUsuario } from '@/endpoints/atualizar-usuarios'
import { atualizarCategoria } from '@/endpoints/atualizar-categoria'
import { criarCategoria } from '@/endpoints/cadastro-categorias'
import { login } from '@/endpoints/login'
import { zValidator } from '@hono/zod-validator'

//JWT
import { jwt, type JwtVariables } from 'hono/jwt'
import { listaProdutos } from './endpoints/lista-produtos'
import { cadastroProduto } from './endpoints/cadastro-produto'
import z from 'zod'
import { createPedidoSchema } from './utils/type'

const app = new Hono<{ Variables: JwtVariables }>()

//Middleware
app.use(
  '/api/*',
  jwt({
    secret: process.env.JWT_SECRET!,
    alg: 'HS256',
  }),
)

app.onError((err, c) => {
  // if (err instanceof z.ZodError) {
  //   return c.json(
  //     {
  //       success: false,
  //       errors: err.errors.map((e) => ({
  //         field: e.path.join('.'),
  //         message: e.message,
  //       })),
  //     },
  //     400
  //   )
  // }
  console.log(err)

  return c.json({
    error: "Erro interno do servidor.",
  }, 500)
})

//Endpoints
app.get('/api/listar-usuarios', listarUsuarios)
app.get('/produtos', listaProdutos)
app.get('/produtos/:id', listaProdutos)
app.post('/api/cadastro-produto', cadastroProduto)
app.post('/cadastro', cadastroUsuario)
app.put('/atualizar-usuario/:id', atualizarUsuario)
app.post('/login', login)
app.post('/api/criar-categoria', criarCategoria)
app.post('/criar-pedido', criarCategoria)
app.put('/teste', atualizarCategoria)

export default app
