import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const router = Router()

router.post('/cadastro', new UserController().create)
router.post('/login', new UserController().login)

export { router }
