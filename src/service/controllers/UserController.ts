import { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { HttpStatusCode } from 'axios'

import bcrypt from 'bcryptjs'
// import { Jwt } from 'jsonwebtoken'

interface IUserDataProps {
  id: number
  name: string
  email: string
  password: string
  extension: number
  position: string
  sector: string
}

const prisma = new PrismaClient()

export class UserController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        name,
        email,
        password,
        extension,
        position,
        sector,
      }: IUserDataProps = req.body

      const hashedPassword = await bcrypt.hash(password, 8)

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          extension,
          position,
          sector,
        },
      })

      res.status(HttpStatusCode.Accepted).json({
        newUser,
        erro: false,
        mensagem: 'usuário cadastrado com sucesso',
      })
    } catch (error) {
      res.status(HttpStatusCode.InternalServerError).json({
        erro: true,
        mensagem: 'Falha ao cadastrar usuário',
      })
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: IUserDataProps = req.body

      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return res.status(HttpStatusCode.BadRequest).json({
          error: true,
          message: 'Usuário ou senha incorretos a',
        })
      }

      const passwordVerify = await bcrypt.compare(password, user.password)

      if (!passwordVerify) {
        return res.status(HttpStatusCode.BadRequest).json({
          error: true,
          message: 'Usuário ou senha incorretos b',
        })
      }

      return res.status(HttpStatusCode.Accepted).json({
        error: false,
        message: 'Login Realizado com sucesso!',
      })
    } catch (error) {
      console.error(error)
      next(error)
      return res
        .status(HttpStatusCode.Unauthorized)
        .json({ error: true, message: 'Usuário não validado' })
    }
  }
}
