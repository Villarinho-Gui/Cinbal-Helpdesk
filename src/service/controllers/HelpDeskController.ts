import { NextFunction, Request, Response, Express } from 'express'
import { HttpStatusCode } from 'axios'
import { v4 as uuidv4 } from 'uuid'

import { PrismaClient } from '@prisma/client'

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
}

export class HelpDeskController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, category, description }: HelpDeskData = req.body
      const files: Express.Multer.File[] = req.files as Express.Multer.File[]

      const prisma = new PrismaClient()

      const createdFiles = files.map((file: Express.Multer.File) => ({
        id: uuidv4(),
        url: file.filename,
      }))

      const callHelpDesk = await prisma.call.create({
        data: {
          title,
          category,
          description,
          files: {
            create: createdFiles,
          },
        },
      })

      res.status(HttpStatusCode.Accepted).json({
        callHelpDesk,
        error: false,
        message: 'Chamado aberto com sucesso!',
      })
    } catch (error) {
      console.error(error)
      res.status(HttpStatusCode.BadRequest).json({
        error: true,
        message: 'Ocorreu um erro ao tentar abrir o chamado',
      })
    }
  }
}
