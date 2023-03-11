const userModel = require('../models/User');
const studentModel = require('../models/Student');
const teacherModel = require('../models/Teacher');
const enrollementModel = require('../models/Enrollement');
const courseModel = require('../models/Course');
const { validationResult } = require('express-validator');
const err= new Error();

exports.getSubjects=async(req,res,next)=>{
  try
  {
    const id = req.userId;
    const role =  req.userRole;
    if(role === 'student'){
      console.log("student");
      const student = await studentModel.findOne({user_id: id}).lean();
      console.log("student",student);
      const enro = await enrollementModel.find({sec_id:student.sec_id}).populate('c_id').lean();
      console.log("enrollement",enro);
      subjects = enro.map(enrollment => enrollment.c_id);
      console.log(subjects);
      }
      if(role === 'teacher'){
        const teacher = await teacherModel.findOne({user_id: id}).lean();
        const enro = await enrollementModel.find({t_id:teacher._id}).populate('c_id').lean();
      console.log("enrollement",enro);
      subjects = enro.map(enrollment => enrollment.c_id);
      console.log(subjects);
      }
      const message = subjects.length > 0 ? 'Successfully done' : 'No data found';
      return res.status(200).json({ success: true, data: subjects, message });
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
    const {name, code}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      err.status=422;
      err.message=errors.array()[0].msg;
      throw err;
    }
    const already = await courseModel.findOne({code: code});
    if(already){
      already.name= name;
      already.code= code;
      already.save();
    }
    else{
      const subject= new courseModel({name:name, code:code});
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
