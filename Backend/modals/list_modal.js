const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const List_Schema = new Schema({
    _id:Number,
    item:String
})

const MyModel = mongoose.model('list', List_Schema)

module.exports = MyModel;