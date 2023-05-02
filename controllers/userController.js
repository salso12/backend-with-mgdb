const {User} = require('./../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi')

exports.index = async (req, res) => {
    try{
      const result = await User.find()
      res.json({
        success: true,
        users: result
      })
    }catch(error){
      res.status(500).json({
        success: false,
        error
      })
    }
}

exports.register = async (req,res) =>{
  const schema = Joi.object({
    name: Joi.string().uppercase().trim().min(3).max(10).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    address: Joi.string().trim().min(3).max(50).required(),
    city: Joi.string().trim().required(),
    phone: Joi.string().required(),
  });

  const { value, error } = schema.validate(req.body)

  if (error) {
    const { path, message } = error.details[0];
    return res.status(400).json({ message: message, error})
  }

  let {name,email,password,address,city,country,phone} = value
  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    address,
    city,
    country,
    phone
  })
  try{
    const result = await user.save()
    res.status(201).json({
      success: true,
      user: result
    })
  }catch(error){
    res.status(500).json({
      success: false,
      error
    })
  }
}
exports.login = async(req, res) => {

  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    
  });

  const { value, error } = schema.validate(req.body)

  if (error) {
    const { path, message } = error.details[0];
    return res.status(400).json({ message: message, error})
  }

  const {email, password} = value

  const user = await User.findOne({ email: email})

  if(!user){
    return res.status(404).json({
      success: false,
      message: 'wrong password or email'
    })
  }
  if(user && bcrypt.compareSync( password, user.password)){
    const secret = process.env.SECRET_KEY

   const token = jwt.sign({
    userId: user.id,
    name: user.name
   },
    secret, {expiresIn: '1h'})
    return res.status(200).json({
      success:true,
      message: "user is authenticated",
      user: user.name,
      token
    })
  }

  res.status(400).json({
    success: false,
    message: "wrong password or email"
  })
}