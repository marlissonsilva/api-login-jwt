import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, minlength: 3, maxlength: 100 },
    password: { type: String, required: true, minlength: 6, maxlength: 100 },
    admin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)
export default User;