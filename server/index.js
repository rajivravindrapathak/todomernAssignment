const express = require('express')
const cors = require('cors')
const { connection } = require('./config/db')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 2001

app.use(express.json())
app.use(cors())

const {userController } = require('./routes/user.rotes')
const { TodoController } = require('./routes/todo.routes')

app.use('/', userController) 
app.use('/', TodoController)  

app.listen(PORT, async () => {
    try {
        await connection
        console.log('connected to db')
    } catch (error) {
        console.log(error)
        console.log('not connected to db')
    }
    console.log(`listing on PORT ${PORT}`)
})  