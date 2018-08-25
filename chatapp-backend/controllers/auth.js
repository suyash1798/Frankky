const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const User = require('../models/userModels');
const Helpers = require('../Helpers/helpers');

module.exports = {
  async CreateUser(req,res){
    const schema = Joi.object().keys({
        username: Joi.string()
            .min(5)
            .max(10)
            .required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).required()
    });

    const { error,value } = Joi.validate(req.body,schema);
    console.log(value);
    if(error && error.details){
        return res.status(500).json({message:error.details});
    }
    const userEmail = await User.findOne({email:Helpers.lowerCase(req.body.email)});
    if(userEmail){
        return res.status(HttpStatus.CONFLICT).json({message:'Email already exist'});
    }

    const userName = await User.findOne({username: Helpers.firstUpper(req.body.username)});
    if(userName){
        return res.status(HttpStatus.CONFLICT).json({message:'username already exists'});
    }
  }
};