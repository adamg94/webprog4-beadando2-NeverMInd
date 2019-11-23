const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const SETTINGS = require('./cfg.js')
const port = SETTINGS.PORT
const mport = SETTINGS.MONGO_PORT
const host = SETTINGS.HOSTNAME

app.use(cors())
app.use(express.json())

mongoose.connect(`mongodb://${host}:${mport}/web4`, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.once('open', _ =>{
    console.log('MongoDB kapcsolat létrehozva')
})

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)
app.listen(port, host, 
    _ => {
        console.log(`A szerver fut: ${host}:${port}`)
    })