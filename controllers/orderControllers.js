const { OrderItem } = require('../models/orderIdtems');
const {Order} = require('./../models/order');
const {Product} = require('../models/product')
const mongoose = require('mongoose');

exports.indexP = async(req, res, next) => {
    try{
      orders = await Order.find().populate('user', 'name email')
                                  .populate({ path: 'orderItems', populate: {
                                    path: 'product', select: 'title description',populate: {
                                        path: 'category'
                                    }
                                  }})
      res.json({
        orders,
        success: true
      })
    }catch(error){
      res.status(500).json({success: false})
    }
}
exports.save = async (req, res) => {
 let { shippingAdress,invoiceAdress,city,country,phone,items }= req.body

 let total = 0
 const user = "643d538b90396fbed1630d26"

 const orderItemIds = await Promise.all(items.map(async item =>{
    const {price} = await Product.findById(item.product, 'price')
   const myorderItems = await OrderItem.create(...item, price)
   return myorderItems._id
 }))

  const myorder = new Order({shippingAdress,invoiceAdress,city,country,phone,orderItems: orderItemIds, user})

  myorder.save()
           .then(insertedOrder => {
            res.status(201).json({
                order: insertedOrder,
                success: true 
            })
           })
           .catch (err => {
            res.status(500).json({
                error: err,
                success: false
            })
           })
}