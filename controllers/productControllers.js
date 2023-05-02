const {Product} = require('./../models/product');
const mongoose = require('mongoose');
const Joi = require('joi');

exports.indexP = async(req, res, next) => {
    try{
      products = await Product.find().populate('category','_id label')
      res.json({
        products,
        success: true
      })
    }catch(error){
      res.status(500).json({success: false})
    }
  }

exports.show = async (req, res, next) => {
  let { id } = req.params
  if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({
      success: false,
      message: "id is not falid"
    })
  }
  try{
    products = await Product.findById(id)
    if(!products){
      return res.status(404).json({
        message: "Pruduct not found",
        success: false
      })
    }
    res.json({
      products,
      success: true
    })
  }catch(error){
    res.status(500).json({success: false})
  }
}


exports.save = (req, res) => {

  const schema = Joi.object({
    title: Joi.string().uppercase().trim().min(3).max(10).required(),
    content: Joi.string().trim().min(3).required(),
    price: Joi.number().integer().required(),
    category: Joi.string().required(),
    brand: Joi.string().trim().required(),
    description: Joi.string().required(),
    rating: Joi.number().integer().required(),
    isFeatured: Joi.boolean(),
    countStock: Joi.number().integer(),
    thumbnail: Joi.string(),
    images: Joi.array().items(Joi.string())
  });

  const { value, error } = schema.validate(req.body);

  if (error) {
    const { path, message } = error.details[0];
    return res.status(400).json({ message: message, error})
  }

  let {title,content,price, category,brand ,description, rating, isFeatured, countStock,images} = value
  let thumbnail;

  if(require.file){
    const domaine = process.env.DOMAINE_NAME
    const port = process.env.PORT
    thumbnail = `${domaine}:${port}/images/${thumbnail}`
  }
  const myProduct = new Product({
    title: title,
    content: content,
    price: price,
    category: category,
    brand: brand,
    description: description,
    rating: rating,
    isFeatured: isFeatured,
    countStock: countStock,
    thumbnail: thumbnail,
    images: images
})
myProduct.save()
.then(insertedProduct => {
    res.status(201).json({
        product:insertedProduct,
        message: 'Product saved successfully'
    })
})
.catch(error => {
    res.status(500).json({
        error: error,
        message: 'Error saving product'
    })
})
}

exports.update = async (req, res, next) => {
  let { id } = req.params
  const { title, content, price } = req.body

  if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({
      success: false,
      message: "id is not falid"
    })
  }
  try{
    products = await Product.findOneAndReplace({'_id':id},req.body)

    if(!products){
      return res.status(404).json({
        message: "Pruduct not found",
        success: false
      })
    }
    res.json({
      products,
      success: true
    })
  }catch(error){
    res.status(500).json({success: false})
  }
}
exports.patchh = async (req, res, next) => {
  let { id } = req.params
  const { title, content, price } = req.body

  if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({
      success: false,
      message: "id is not falid"
    })
  }
  try{
    products = await Product.findOneAndUpdate({'_id':id},req.body)

    if(!products){
      return res.status(404).json({
        message: "Pruduct not found",
        success: false
      })
    }
    res.json({
      products,
      success: true
    })
  }catch(error){
    res.status(500).json({success: false})
  }
}
// exports.update =(req, res) => {
//   const productId = req.params.id;
//   const { title, content, price } = req.body;

//   Product.findByIdAndUpdate(productId, { title, content, price }, { new: true })
//     .then(updatedProduct => {
//       if (!updatedProduct) {
//         return res.status(404).json({
//           message: 'Product not found',
//         });
//       }

//       res.status(200).json({
//         product: updatedProduct,
//         message: 'Product updated successfully',
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         error: error,
//         message: 'Error updating product',
//       });
//     });
// };
exports.dalete = (req, res) => {
  const productId = req.params.id;

  Product.findByIdAndDelete(productId)
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

exports.search = async (req, res) => {
  const query = req.query;
  const filters = {};

  // Convert price range to a min and max value for filtering
  if (query.price) {
    const [minPrice, maxPrice] = query.price.split('-');
    filters.price = { $gte: minPrice, $lte: maxPrice };
  }

  // Add other filters based on query parameters
  if (query.brand) filters.brand = { $regex: query.brand, $options: 'i' };
  if (query.category) filters.category = { $regex: query.category, $options: 'i' };
  if (query.title) filters.title = { $regex: query.title, $options: 'i' };

  try {
    const products = await Product.find(filters);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// exports.search = async(req, res) =>{

//   //res.json(req.query)  //let {id} = req.params  =  let id = req.params.id  -> Destracting
//   let search = req.query.search
//   let segment = req.params.segment

//    if (search){

//     try{
//         let result = await Product.find({title:{[segment]: search}}) //[segment] montionner que le segment est un variable (dynamique)

//         if(!result.length){
//           return res.status(404).json({
//             success: false,
//             message: "Product(s) not Found !"
//           })
//         }
//         res.json({
//           products: result,
//           success: true
//         })
      
//     }catch(error){
//       return res.status(500).json({
//         success: false,
//         message: "Server is down !"
//       })
//     }
//   }
// }