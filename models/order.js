const { Schema, model }= require('mongoose')

const SchemaOrder = new Schema({
    shippingAdress: {
        type: String,
        required: true
    },
    invoiceAdress: String,
    city: String,
    country: String,
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['shipped','received','cancled','pending']
    },
    total: Number,
    user : {
        type: Schema.Types.ObjectId, 'ref': 'User',
        required: true
    },
    orderItem: [{
        type: Schema.Types.ObjectId, ref: 'OrderItem'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
})

exports.Order = model('Order', SchemaOrder)