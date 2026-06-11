import { Hono } from 'hono'

//Componentes do Endpoint
import { listarUsuarios } from '@/endpoints/lista-usuarios'
import { cadastroUsuario } from '@/endpoints/cadastro-usuarios'
import { atualizarUsuario } from '@/endpoints/atualizar-usuarios'
import { criarCategoria } from '@/endpoints/cadastro-categorias'
import { login } from '@/endpoints/login'

//JWT
import { jwt, type JwtVariables } from 'hono/jwt'

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
  console.log(err)

  return c.json({
    error: "Erro interno do servidor.",
  }, 500)
})

//Endpoints
app.get('/api/get-users', listarUsuarios)
app.post('/register', cadastroUsuario)
app.put('/update-user/:id', atualizarUsuario)
app.post('/login', login)
app.post('/api/create-category', criarCategoria)

export default app
