import { HttpStatusCode } from 'axios'
import jwt from 'jsonwebtoken'

import { promisify } from 'util'

export const eAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log(authHeader)
  if (!authHeader) {
    return res.status(HttpStatusCode.BadRequest).json({
      erro: true,
      mensagem:
        'É necessário realizar o login para poder acessar o portal de chamado! A',
    })
  }
  const [, token] = authHeader.split(' ')
  console.log(' token: ' + token)

  if (!token) {
    return res.status(HttpStatusCode.BadRequest).json({
      erro: true,
      mensagem:
        'É necessário realizar o login para poder acessar o portal de chamado! B',
    })
  }

  try {
    const decode = await promisify(jwt.verify)(
      token,
      'laj20rqmfpajfç3jgçmalei0492494',
    )

    req.userId = decode.id
    return next()
  } catch (err) {
    return res.status(HttpStatusCode.BadRequest).json({
      erro: true,
      mensagem:
        'É necessário realizar o login para poder acessar o portal de chamado!',
    })
  }
}
