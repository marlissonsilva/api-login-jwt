const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
    register: async (req, res) => {
        const selectedUser = await User.findOne({ email: req.body.email })
        if (selectedUser) { return res.status(400).send('Email já cadastrado') }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        })
        try {
            const savedUser = await user.save()
            res.send(savedUser)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    login: async (req, res) => {
        const selectedUser = await User.findOne({ email: req.body.email })
        if (!selectedUser) { return res.status(400).send('Email ou senha incorretos') }

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if (!passwordAndUserMatch) { return res.status(400).send('Email ou senha incorretos') }

        const token = jwt.sign({ _id: selectedUser._id }, process.env.TOKEN_SECRET)

        // enviando token para o usuário/ front end
        res.header('authorization-token', token)
        res.send('Usuário logado!')
    }
}


module.exports = userController