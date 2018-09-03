const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');

const dbConfig = require('../config/secret');

module.exports = {
    verifyToken: (req,res,next)=>{
        if(!req.headers.authorization){
            return res
                .status(HttpStatus.UNAUTHORIZED)
                .json({message:'No Authorization'})
        }
        const token =req.cookies.auth || req.headers.authorization.split(' ')[1];
        console.log('token',token);

        if(!token){
            return res
                .status(HttpStatus.FORBIDDEN)
                .json({message:'No token provided'});
        }

        return jwt.verify(token,dbConfig.secret,(err,decoded)=>{
        console.log('body',req.body);
            if(err){
                if(err.expiredAt < new Date()){
                    return res
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .json({
                            message:'Token has expired. Please login again',
                            token:null
                        });
                }
                next();
            }
            console.log(err,decoded);
            req.user = decoded.data;
            next();
        });
    }
};