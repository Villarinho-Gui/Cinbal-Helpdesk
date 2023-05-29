import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { HelpDeskController } from '../controllers/HelpDeskController'
import { uploadHelpDesk } from '../middlewares/uploadFilesMiddleware'

const router = Router()

router.post('/cadastro', new UserController().create)
router.post('/login', new UserController().login)

router.post(
  '/abrir-chamado',
  uploadHelpDesk.array('files'),
  new HelpDeskController().create,
)

router.get('/chamado/:id', new HelpDeskController().find)
router.delete('/chamado/:id', new HelpDeskController().findIdAndDelete)
router.get('/chamados', new HelpDeskController().findAll)

export { router }
