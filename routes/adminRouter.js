const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController')

router.get('/', auth, (req, res) => {
    console.log(req.user)
    if (req.user.admin) {
        res.send('Bem vindo a pagina de Admin')
        return
    }

    res.send('Not Admin: Access Denied')

})
module.exports = router