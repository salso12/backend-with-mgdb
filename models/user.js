const { Schema, model } = require('mongoose')

const schemaUser = Schema({
   name: {
    type: String,
    required: true,
   
   },
   email: {
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: true
   },
   address: String,
   city: String,
   country: String,
   phone: String,
   isAdmin: {
    type: Boolean,
    default: false
   }
})

exports.User = model('User', schemaUser)