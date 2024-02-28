const userController = {
    register: (req, res) => {
        console.log('Register')
        res.send('Register')
    },
    login: (req, res) => {
        console.log('Login')
        res.send('Login')
    }
}


module.exports = userController