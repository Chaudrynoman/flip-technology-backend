const userModel = require('../models/user');
const subjModel = require('../models/subject');
const { validationResult } = require('express-validator');
const err= new Error();

  exports.assignSubject = async(req,res)=>{
    try{
      const {id,subjCode }=req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        err.status=422;
        err.message=errors.array()[0].msg;
        throw err;
      }
      const user=await userModel.findOne({ _id: id });
      if (!user) {
        err.status=401;
        err.message="No User exist of this id.";
        throw err;
      }
      const subject = await subjModel.findOne({code: subjCode});
      if (!subject) {
        err.status=401;
        err.message="No Subject exist of this Code.";
        throw err;
      }

      if(user.subjects){
        user.subjects.push(subject);
      }
      else{
        user.subjects = [];
        user.subjects.push(subject);
      }
      
      await user.save();
      res.status(201).json({Suceess:true,Message:"Sucessfully assign subject"});
      return;
  }
  catch(e){
    console.log('error', e)
    return res.status(e.status || 500).json({ suceess: false, msg: e.message, data: {} })
  } 
}
exports.assignTeacher = async(req,res)=>{
  try{
    const { teacherID, studentID }=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      err.status=422;
      err.message=errors.array()[0].msg;
      throw err;
    }
    const student = await userModel.findOne({ _id: studentID });
    if (!student) {
      err.status=401;
      err.message="No Student exist of this id.";
      throw err;
    }
    const teacher= await userModel.findById(teacherID);
    if(student.teachers){
      student.teachers.push({teacherID: teacherID, teacherName: teacher.name});
    }
    if(teacher.students){
      teacher.students.push({studentID: student.id, studentName: student.name});
    }
    student.save();
    teacher.save();
    res.status(201).json({Suceess:true,Message:"Sucessfully assign Teacher"});
    return;
}
catch(e){
  console.log('error', e)
  return res.status(e.status || 500).json({ suceess: false, msg: e.message, data: {} })
} 
}