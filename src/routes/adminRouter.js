import { Router } from 'express'
import auth from '../controllers/authController.js'
const router = Router()

router.get('/', auth, (req, res) => {
    if (req.user.admin) {
        res.send('Bem vindo a pagina de Admin')
        return
    }

    res.send('Not Admin: Access Denied')

})
export default router