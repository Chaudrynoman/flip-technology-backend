const subjModel = require('../models/subject');
const userModel = require('../models/user');
const { validationResult } = require('express-validator');
const err= new Error();

exports.getSubjects=async(req,res,next)=>{
  try
  {
    console.log("id",req.query.id);
    const id= '63cd872172ea58db19432034';
    const results = await userModel.findById(id).lean();
    res.status(200).json({success: true, data: results.subjects ? results.subjects : [],Message:results.subjects ? "Sucessfully Don":"No Data Found"});
    return;
  }
  catch(e)
  {
    console.log('error', e)
    return res.status(e.status || 500).json({ suceess: false, msg: e.message, data: {} })
  }
}
exports.insertSubjects=async(req,res,next)=>{
  try
  {
    const {name, code, weeks}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      err.status=422;
      err.message=errors.array()[0].msg;
      throw err;
    }
    const already = await subjModel.findOne({code: code});
    if(already){
      already.name= name;
      already.weeks =weeks;
      already.save();
    }
    else{
      const subject= new subjModel({name:name, code:code, weeks:weeks});
      subject.save();
    }
    res.status(201).json({Suceess:true,Message:"Sucessfully Done"});
    return;
  }
  catch(e)
  {
    console.log('error', e)
    return res.status(e.status || 500).json({ suceess: false, msg: e.message, data: {} })
  }
}
