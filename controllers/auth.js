const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt=require('jsonwebtoken');
const userModel = require('../models/user');
// const { use } = require('../routes/auth');
const err= new Error();

exports.login = async(req, res, next) => {
    try{
        const {email,password}=req.body;
        const errors =validationResult(req);
        if (!errors.isEmpty()) {
            err.status=422;
            err.message=errors.array()[0].msg;
            throw err;
        }
        const user=await userModel.findOne({ email: email });
        if (!user) {
            err.status=422;
            err.message="This Email is not Register!";
            throw err;
        }
        const doMatch=await bcrypt.compare(password, user.password);
        if (!doMatch) {
            err.status=401;
            err.message="Email or Password Incorrect!";
            throw err;
        }
        const token=jwt.sign({
            email: email,
            id: user._id.toString(),
            role: user.role,
            expiresIn: '1h'
        },
        'securesecret',
        );
        res.status(200).json({Suceess:true,Message:"Sucessfully LogIn!",Token:token,user:user});
        return;
    }
    catch(e){
        console.log('error', e)
        return res.status(e.status || 500).json({ Suceess: false, msg: e.message, data: {} })
    }
  };
  exports.insertUser = async(req, res, next) => {
    try{
        const {email,name,password,role}=req.body;
        const date = new Date();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            err.status=422;
            err.message=errors.array()[0].msg;
            throw err;
        }
        const user=await userModel.findOne({ email: email });
        if (user) {
            err.status=401;
            err.message="E-Mail exists already, please pick a different one.";
            throw err;
            
        }
        const hashedPassword=await bcrypt.hash(password, 12);
        const newUser = new userModel({
          email: email,
          password: hashedPassword,
          name: name,
          role: role,
          date: date
        });
        newUser.save();
        res.status(201).json({Suceess:true,Message:"Sucessfully Registered!"});
        return;
    }
    catch(e){
        console.log('error', e)
        return res.status(e.status || 500).json({ Suceess: false, msg: e.message, data: {} })
    }
}
exports.getprofile=async(req,res,next)=>{
    try
    {
        const id=req.userId;
        const results = await userModel.findById(id).lean();
        res.status(200).json({Success: true, data: results ? results : {},Message:results ? "Sucessfully Don":"No Data Found"});
        return;
    }
    catch(e)
    {
        console.log('error', e)
        return res.status(e.status || 500).json({ Suceess: false, msg: e.message, data: {} })
    }
}
