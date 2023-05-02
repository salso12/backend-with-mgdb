const {Category} = require('./../models/category');
const mongoose = require('mongoose');

exports.indexP = async(req, res, next) => {
    try{
      Categorys = await Category.find().populate('products')
      res.json({
        Categorys,
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
    Categorys = await Category.findById(id)
    if(!Categorys){
      return res.status(404).json({
        message: "Pruduct not found",
        success: false
      })
    }
    res.json({
      Categorys,
      success: true
    })
  }catch(error){
    res.status(500).json({success: false})
  }
}


exports.save = (req, res) => {

  const schema = Joi.object({
    label: Joi.string().uppercase().trim().min(3).max(10).required(),
    icon: Joi.string().trim().min(3).max(10).required(),
    color: Joi.string().required(),
    products: Joi.array().items(Joi.string()),
  });

  const { value, error } = schema.validate(req.body);

  if (error) {
    const { path, message } = error.details[0];
    return res.status(400).json({ message: message, error})
  }

  let {label,icon,color,products} = req.body
  const myCategory = new Category({
    label: label,
    icon: icon,
    color: color,
    products: products
})
myCategory.save()
.then(insertedCategory => {
    res.status(201).json({
        Category:insertedCategory,
        message: 'Category saved successfully'
    })
})
.catch(error => {
    res.status(500).json({
        error: error,
        message: 'Error saving Category'
    })
})
}

exports.update = async (req, res, next) => {
  let { id } = req.params
  const { label, icon, color } = req.body

  if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({
      success: false,
      message: "id is not falid"
    })
  }
  try{
    Categorys = await Category.findOneAndReplace({'_id':id},req.body)

    if(!Categorys){
      return res.status(404).json({
        message: "Pruduct not found",
        success: false
      })
    }
    res.json({
      Categorys,
      success: true
    })
  }catch(error){
    res.status(500).json({success: false})
  }
}
exports.patchh = async (req, res, next) => {
  let { id } = req.params
  const { label, icon, color } = req.body

  if(!mongoose.isValidObjectId(id)){
    return res.status(400).json({
      success: false,
      message: "id is not falid"
    })
  }
  try{
    Categorys = await Category.findOneAndUpdate({'_id':id},req.body)

    if(!Categorys){
      return res.status(404).json({
        message: "Pruduct not found",
        success: false
      })
    }
    res.json({
      Categorys,
      success: true
    })
  }catch(error){
    res.status(500).json({success: false})
  }
}
// exports.update =(req, res) => {
//   const CategoryId = req.params.id;
//   const { label, icon, color } = req.body;

//   Category.findByIdAndUpdate(CategoryId, { label, icon, color }, { new: true })
//     .then(updatedCategory => {
//       if (!updatedCategory) {
//         return res.status(404).json({
//           message: 'Category not found',
//         });
//       }

//       res.status(200).json({
//         Category: updatedCategory,
//         message: 'Category updated successfully',
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         error: error,
//         message: 'Error updating Category',
//       });
//     });
// };
exports.dalete = (req, res) => {
  const CategoryId = req.params.id;

  Category.findByIdAndDelete(CategoryId)
    .then(deletedCategory => {
      if (!deletedCategory) {
        return res.status(404).json({
          message: 'Category not found',
        });
      }

      res.status(200).json({
        message: 'Category deleted successfully',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: 'Error deleting Category',
      });
    });
};