const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxlength:100
    },
    lastName:{
        type:String,
        maxlength:100
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    emailAddress:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    address:{
        type:String,
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    placeOfBirth:{
        type:String,
        required:true
    },
    ownerId:{
        type:String,
        required:true
    }
},{timestamps:true})

const Book = mongoose.model('Book',bookSchema )

module.exports = { Book }