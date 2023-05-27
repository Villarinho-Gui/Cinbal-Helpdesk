import express, { NextFunction, Response } from 'express'
import { router } from './routes/index.js'
import cors from 'cors'
import 'dotenv/config'

import bodyParser from 'body-parser'

const service = express()

service.use(bodyParser.urlencoded({ extended: true }))
service.use(bodyParser.json())
service.use(router)
service.use(cors())

service.use((_, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'X-PINGOTHER, Content-Type, Authorization',
  )

  next()
})

service.listen(process.env.PORT, () => {
  console.log('Servidor iniciado com sucesso!')
})
