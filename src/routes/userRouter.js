import { Router } from 'express'
import userController from '../controllers/userController.js'
const { register, login } = userController
const router = Router()


router.post('/register', register)
router.post('/login', login)

export default router