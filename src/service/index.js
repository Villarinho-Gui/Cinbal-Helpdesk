/* eslint-disable no-unused-vars */
import routes from './routes/routes.js'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './models/db.js'

const app = express()
app.use(routes)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'X-PINGOTHER, Content-Type, Authorization',
  )
  app.use(cors())
  next()
})

app.post('/cadastro', async (req, res) => {
  const data = req.body

  console.log(data)
  res.send(data)
})

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`))

app.listen(8181, function (erro) {
  if (erro) {
    console.log('erro')
  } else {
    console.log('Servidor iniciado com sucesso!')
  }
})
