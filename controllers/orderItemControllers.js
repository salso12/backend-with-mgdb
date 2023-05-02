const { OrderItem } = require('./../models/orderIdtems');
const Joi = require('joi')

exports.index = async (req, res) => {
    try{
      const result = await OrderItem.find()
      res.json({
        success: true,
        orderItem: result
      })
    }catch(error){
      res.status(500).json({
        success: false,
        error
      })
    }
}

exports.order = async (req,res) =>{
  const schema = Joi.object({
    product: Joi.array().items(Joi.string()),
    quantity: Joi.number().required(),
  });

  const { value, error } = schema.validate(req.body)

  if (error) {
    const { path, message } = error.details[0];
    return res.status(400).json({ message: message, error})
  }

  let {product,quantity} = value
  const orderItem = new OrderItem({
    product,
    quantity
  })
  try{
    const result = await orderItem.save()
    res.status(201).json({
      success: true,
      orderItem: result
    })
  }catch(error){
    res.status(500).json({
      success: false,
      error
    })
  }
}
exports.update = async (req, res, next) => {
  let { id } = req.params
  const { products,quantity } = req.body

  if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({
      success: false,
      message: "id is not falid"
    })
  }
  try{
    orderItem = await OrderItem.findOneAndReplace({'_id':id},req.body)

    if(!orderItem){
      return res.status(404).json({
        message: "Pruduct not found",
        success: false
      })
    }
    res.json({
      orderItem,
      success: true
    })
  }catch(error){
    res.status(500).json({success: false})
  }
}
exports.patchh = async (req, res, next) => {
  let { id } = req.params
  const { products,quantity } = req.body

  if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({
      success: false,
      message: "id is not falid"
    })
  }
  try{
    orderItem = await OrderItem.findOneAndUpdate({'_id':id},req.body)

    if(!orderItem){
      return res.status(404).json({
        message: "Pruduct not found",
        success: false
      })
    }
    res.json({
      orderItem,
      success: true
    })
  }catch(error){
    res.status(500).json({success: false})
  }
}
exports.dalete = (req, res) => {
  const orderId = req.params.id;

  OrderItem.findByIdAndDelete(orderId)
    .then(deletedProduct => {
      if (!deletedProduct) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }

      res.status(200).json({
        message: 'Product deleted successfully',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: 'Error deleting product',
      });
    });
};
exports.show = async (req, res, next) => {
  let { id } = req.params
  if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({
      success: false,
      message: "id is not falid"
    })
  }
  try{
    orderItem = await OrderItem.findById(id)
    if(!orderItem){
      return res.status(404).json({
        message: "Pruduct not found",
        success: false
      })
    }
    res.json({
      orderItem,
      success: true
    })
  }catch(error){
    res.status(500).json({success: false})
  }
}