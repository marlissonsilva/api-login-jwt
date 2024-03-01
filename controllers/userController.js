const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { loginValidate, registerValidate } = require('./validate')

const userController = {
    register: async (req, res) => {

        const { error } = registerValidate(req.body)
        if (error) { return res.status(400).send(error) }

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
        const { error } = loginValidate(req.body)
        if (error) { return res.status(400).send(error) }

        const selectedUser = await User.findOne({ email: req.body.email })
        if (!selectedUser) { return res.status(400).send('Email ou senha incorretos') }

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if (!passwordAndUserMatch) { return res.status(400).send('Email ou senha incorretos') }

        const token = jwt.sign({ _id: selectedUser._id, admin: selectedUser.admin }, process.env.TOKEN_SECRET)
        console.log({ _id: selectedUser._id, admin: selectedUser.admin })
        // enviando token para o usuário/ front end
        res.header('authorization-token', token)
        res.send('Usuário logado!')
    }
}


module.exports = userController