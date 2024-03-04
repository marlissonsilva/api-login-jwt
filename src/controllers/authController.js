import jwt from 'jsonwebtoken'

// a funçao esta funcionando como um middleware(intermediario)
const auth = (req, res, next) => {
    const token = req.header('authorization-token')
    if (!token) { return res.send('Access Denied') }

    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified
        console.log(userVerified)
        next()
    } catch (error) {
        return res.send('Access Denied', error)
    }
}

export default auth