require('dotenv').config();
const express = require('express');
const app = express()
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true },
    { useUnifiedTopology: true })
    .then(() => console.log("Conectado!"))
    .catch((error) => console.log("Erro ao concetar no banco", error));


app.use('/user', userRouter)

app.listen(process.env.PORT, () => { console.log(`Server Running in http://localhost:${process.env.PORT}`) })

