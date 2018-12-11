const mongoose = require('mongoose');

const twitterSchema = mongoose.Schema({
    twitterUserName:{
        type:String,
        required:true,
        maxlength:100
    }
},{timestamps:true})

const Twitter = mongoose.model('Twitter',twitterSchema )

module.exports = { Twitter }