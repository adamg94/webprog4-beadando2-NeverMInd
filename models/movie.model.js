const mongoose = require('mongoose')

const Schema = require('mongoose').Schema

const MovieSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    creation_date : {
        type : Date,
        required : true
    },
    imdb_points : {
        type : Number,
        required : true
    },
    length_in_minutes : {
        type : Number,
        required : true
    },
    director : {
        type : String,
        required : true
    },
    writer : {
        type : String,
        required : true
    },
    stars : {
        type : String,
        required : true
    }

})


const Movie = mongoose.model('Movie', MovieSchema)
module.exports = Movie