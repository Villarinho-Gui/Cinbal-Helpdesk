/* eslint-disable no-unused-vars */
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Colaborador } from './models/UserModel.js'
import bcrypt from 'bcryptjs'
import { HttpStatusCode } from 'axios'
import jwt from 'jsonwebtoken'
import { eAdmin } from './middlewares/auth.js'

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

app.get('/', eAdmin, async (req, res) => {
  return res.json({
    erro: false,
    mensagem: 'listagem de usuário',
    id_usuario_logado: req.userId,
  })
})

app.post('/login', async (req, res) => {
  const user = await Colaborador.findOne({
    attributes: ['id', 'nome', 'password'],
    where: {
      nome: req.body.nome,
    },
  })

  if (user === null) {
    return res.status(HttpStatusCode.BadRequest).json({
      erro: true,
      mensagem: 'Usuário ou senha incorretos!',
    })
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(HttpStatusCode.BadRequest).json({
      erro: true,
      mensagem: 'Usuário ou senha incorretos!',
    })
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    'laj20rqmfpajfç3jgçmalei0492494',
    {
      expiresIn: 600,
    },
  )

  return res.json({
    erro: false,
    mensagem: 'Login realizado com sucesso!',
    token,
  })
})

app.post('/login/cadastro', async (req, res) => {
  const data = req.body

  const nome = data.nome
  const email = data.email
  const ramal = data.ramal
  const funcao = data.funcao
  const setor = data.setor
  const password = await bcrypt.hash(data.password, 8)

  Colaborador.create({
    nome,
    email,
    ramal,
    funcao,
    setor,
    password,
  })
})

app.listen(8181, function (erro) {
  if (erro) {
    console.log('erro')
  } else {
    console.log('Servidor iniciado com sucesso!')
  }
})
