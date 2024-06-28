const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  songName:{
    type:String,
    required:true
  },
  songLink:{
    type:String,
    required:true
  }
})


module.exports = mongoose.model('songs', songSchema);