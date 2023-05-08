import express from 'express'
import user from '../controllers/user.js'

const routes = express.Router()

routes.get('/cadastro', user.findAll)

export default routes
