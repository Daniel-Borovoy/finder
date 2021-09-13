const {Schema, model} = require('mongoose')

const schema = new Schema({
    userid: {type: String, required: true, unique: true}
})

module.exports = model('User', schema)