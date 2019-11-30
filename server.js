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

mongoose.connect(`mongodb+srv://web4:DYi5y2xwi1NqMFPU@cluster0-h0zut.mongodb.net/webprogramozas4?retryWrites=true&w=majority`, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
//mongoose.connect(`mongodb://${host}:${mport}/web4`, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

const connection = mongoose.connection

connection.once('open', _ =>{
    console.log('MongoDB kapcsolat létrehozva')
})

const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movie')
app.use('/users', usersRouter)
app.use('/movies', moviesRouter)
app.listen(port, host, 
    _ => {
        console.log(`A szerver fut: ${host}:${port}`)
    })