const mongoose = require('mongoose')

const Schema = require('mongoose').Schema

const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        minlength : 4,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    regdate : {
        type : Date,
        default : Date.now
    },
    lastlogin : {
        type : Date,
        default : Date.now
    },
    level : {
        type : Number,
        default : 0 
    }

})


const User = mongoose.model('User', UserSchema)
module.exports = User