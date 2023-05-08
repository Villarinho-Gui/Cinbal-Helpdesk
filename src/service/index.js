/* eslint-disable no-unused-vars */
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import UserModel from './models/UserModel.js'

const app = express()

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

app.post('/login/cadastro', async (req, res) => {
  const nome = req.body.nome
  const email = req.body.email
  const ramal = req.body.ramal
  const funcao = req.body.funcao
  const setor = req.body.setor
  const password = req.body.password

  UserModel.create({
    nome,
    email,
    ramal,
    funcao,
    setor,
    password,
  }).then(() => {
    res.redirect('/login')
  })
})

app.listen(8181, function (erro) {
  if (erro) {
    console.log('erro')
  } else {
    console.log('Servidor iniciado com sucesso!')
  }
})
