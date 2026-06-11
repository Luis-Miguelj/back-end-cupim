import { users } from "@/db/schema"
import { db } from "@/db"
import argon2 from 'argon2'
import type { usuario, login } from "@/utils/type"
import { eq } from "drizzle-orm"
import { verificacaoEmails } from "@/services/verificacao-emails"

interface User {
  id: number
  nome: string
  email: string
  senha: string
  admin?: boolean | null
}



export class Users {

  async cadastro({ nome, email, senha, endereco }: usuario) {
    if (!nome || !email || !senha) {
      return {
        error: "Um dos campos (nome, email, senha) não preenchido corretamente.",
        message: null
      }
    }

    const verifyEmail = await verificacaoEmails(email)

    if (verifyEmail == true) {
      return {
        error: "Esse e-mail já existe, favor tente novamente.",
        message: null
      }
    }

    const hashPassword = await argon2.hash(senha)

    const cadastro = await db.insert(users).values({
      nome: nome.toLowerCase(),
      email: email.toLowerCase(),
      senha: hashPassword,
      admin: false,
      endereco: !endereco ? null : endereco.toLowerCase()
    })

    if (!cadastro) return { error: "Não foi possível cadastrar usuário.", message: null }

    return {
      message: "Cadastro bem sucedido!",
      error: null
    }
  }

  async atualizarUsuario({ nome, email, senha, endereco, admin }: usuario, id: number) {

    if (!id) {
      return {
        error: "O id do usuário não foi informado.",
        message: null
      }
    }

    if (!nome || !email || !senha || !endereco && admin == false) {
      return {
        error: "Um dos campos (nome, email, senha, endereço) não foi preenchido corretamente.",
        message: null
      }
    }

    const hashPassword = await argon2.hash(senha)

    const update = await db.update(users).set({
      nome,
      email,
      senha: hashPassword,
      endereco
    }).where(eq(users.id, id))

    if (!update) {
      return {
        error: "Não foi possível atualizar o usuário.",
        message: null
      }
    }

    return {
      message: "Usuário atualizado com sucesso!",
      error: null
    }

  }

  async listarUsuarios() {
    const usuarios: User[] = await db.select().from(users)

    if (!usuarios) {
      return {
        error: "Erro ao trazer usuários...",
        usuarios: null
      }
    }

    return { usuarios, error: null }

  }

  async login({ email, senha }: login) {
    if (!email || !senha) {
      return {
        error: "Um dos compos não foi preenchido corretamente.",
        message: null,
        usuario: null
      }
    }

    const [user] = await db.
      select()
      .from(users)
      .where(eq(users.email, email))

    if (!user) {
      return {
        error: "Usuário não encontrado.",
        message: null,
        usuario: null
      }
    }

    const verifyPassword = await argon2.verify(user.senha, senha)

    if (!verifyPassword) {
      return {
        error: "Senha incorreta.",
        token: null
      }
    }


    return {
      error: null,
      message: "Usuário encontrado!",
      usuario: {
        id: user.id,
        email: user.email,
        admin: user.admin
      }
    }


  }
}