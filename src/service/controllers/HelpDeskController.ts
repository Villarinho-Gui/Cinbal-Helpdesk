import { NextFunction, Request, Response, Express } from 'express'
import { HttpStatusCode } from 'axios'
import { v4 as uuidv4 } from 'uuid'

import { PrismaClient } from '@prisma/client'
import { DateTime } from 'luxon'

interface FileData {
  id: string
  url: string
}

interface HelpDeskData {
  id: string
  title: string
  category: string
  description: string
  files: FileData[]
  createdAt: Date
}

export class HelpDeskController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, category, description }: HelpDeskData = req.body
      const files: Express.Multer.File[] = req.files as Express.Multer.File[]

      const prisma = new PrismaClient()

      const createdAt = DateTime.now().toISO()!

      const createdFiles = files.map((file: Express.Multer.File) => ({
        id: uuidv4(),
        url: file.path,
      }))

      const callHelpDesk = await prisma.call.create({
        data: {
          title,
          category,
          description,
          files: {
            create: createdFiles,
          },
          createdAt,
        },
      })

      res.status(HttpStatusCode.Accepted).json({
        callHelpDesk,
        error: false,
        message: 'Chamado aberto com sucesso!',
      })
    } catch (error) {
      console.error(error)

      next(error)
      res.status(HttpStatusCode.BadRequest).json({
        error: true,
        message: 'Ocorreu um erro ao tentar abrir o chamado',
      })
    }
  }

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id

      const prisma = new PrismaClient()

      const callHelpDesk = await prisma.call.findUnique({
        where: {
          id,
        },
        include: {
          files: true,
        },
      })
      if (callHelpDesk) {
        return res.status(HttpStatusCode.Accepted).json({
          callHelpDesk,
          error: false,
          message: 'Chamado encontrado com sucesso!',
        })
      }
    } catch (error) {
      console.error(error)
      next(error)
      return res.status(HttpStatusCode.NotFound).json({
        erro: true,
        mensagem: 'Chamado não encontrado',
      })
    }
  }

  async findAll(_: Request, res: Response, next: NextFunction) {
    const prisma = new PrismaClient()

    try {
      const allCallHelpDesk = await prisma.call.findMany()
      return res.status(HttpStatusCode.Accepted).json({
        allCallHelpDesk,
        error: false,
        message: 'Foram encontrado todos os chamados com sucesso!',
      })
    } catch (error) {
      console.error(error)
      next(error)
      return res.status(HttpStatusCode.BadRequest).json({
        error: true,
        message: 'Falha ao listar os chamados',
      })
    }
  }

  async findIdAndDelete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id

    const prisma = new PrismaClient()

    const callHelpDesk = await prisma.call.delete({
      where: {
        id,
      },
    })
    next()

    return res.json({ message: 'Chamado apagado com sucesso!', callHelpDesk })
  }
}
