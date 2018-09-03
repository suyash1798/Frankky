/*
* Created By Suyash Tiwari
* on 5 August 2018
*/

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   username:{type:String},
   email:{type:String},
   password:{type:String},
   posts:[
       {
          postId:{type:mongoose.Schema.Types.ObjectId,ref:'Post'},
          post:{type:String},
          created:{type:Date,default:Date.now()}
       }
   ]
});

module.exports = mongoose.model('User',userSchema);