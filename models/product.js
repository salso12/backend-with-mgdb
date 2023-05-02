const { Schema, model} = require('mongoose')

const schemaProduct = Schema({
    title: {
      type: 'string',
      required: true,
      min: 4
    },
    description: String,
    content: String,
    price: Number,
    brand: String,
    countStock:{
      type: Number,
      default: 0
    },
    thumbnail: String,
    images: [String],
    rating: {
      type: Number,
      enum:[0,1,2,3,4,5],
      default: 0
    },
    isFeatured:{
      type: Boolean,
      debug: false
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    },
    category:{ 
      type: Schema.Types.ObjectId,
      ref:'Category'}
})

exports.Product = model('Product', schemaProduct)