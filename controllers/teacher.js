const userModel = require('../models/User');
const { validationResult } = require('express-validator');
const err= new Error();
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;

exports.postVideo = async(req,res,next)=>{
  try
  {
    const {url, duration}=req.body;
    const {subjectID, weekNo, chapter} = req.query;
    const errors = validationResult(req);
    let index=0;
    if (!errors.isEmpty()) {
      err.status=422;
      err.message=errors.array()[0].msg;
      throw err;
    }
    const teacher = await userModel.findById(req.userId);
    metadata={teacherID: req.userId, subjectID: subjectID,weekNo: weekNo, chapter: chapter,videoUrl:url, duration: duration}
    if(teacher.subjects){
      teacher.subjects.forEach(element => {
        if(element._id == subjectID){
          console.log('here');
          index += 1;
          element.videoData.push(metadata);
        }
      })
    }
    // await teacher.subjects.forEach(element => {
    //   if(element.id===subjectID){
    //     element.weekNo.forEach(e=>{
    //       if(e===weekNo){
    //         e.forEach(chapt=>{
    //           if(chapt.topicName===chapter){
    //             if(chapt.metaData){
    //               chapt.metaData.push(metadata);
    //             }
    //             else{
    //             chapt.metaData = [];
    //             chapt.metaData.push(metadata);
    //             }
    //           }
    //         })
    //       }
    //     });
    //   }
    // });
    teacher.data= []
    await teacher.data.push(metadata);
    teacher.save((err)=>{
      if(err) return console.error(err);
      console.log("Data saved");
    });
    res.status(201).json({success: true, Message: "Sucessfully Don"});
    return;
  }
  catch(e)
  {
    console.log('error', e)
    return res.status(e.status || 500).json({ suceess: false, msg: e.message, data: {} })
  }
}
exports.getVideo = async(req,res,next)=>{
  try
  {
    let data=[];
    const {teacherID, weekNo, chapter} = req.query;
    var objectId = mongoose.Types.ObjectId(subjectID);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      err.status=422;
      err.message=errors.array()[0].msg;
      throw err;
    }
    const teacher = await userModel.findOne({  _id : subjectID } );
    if(teacher){
      teacher.data.forEach(element => {
        if( element.weekNo===weekNo && chapter === chapter){
          data.push({videoUrl:element.url, duration: element.duration})
        }
      });
    }
    res.status(201).json({success: true, data:data, Message: "Sucessfully Don"});
    return;
  }
  catch(e)
  {
    console.log('error', e)
    return res.status(e.status || 500).json({ suceess: false, msg: e.message, data: {} })
  }
}
exports.getTeachers = async (req, res) => {
  try {
    const id = await req.query.id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      err.status=422;
      err.message=errors.array()[0].msg;
      throw err;
    }
    let filter = {role:'teacher'}
    if (id) {
      filter = { _id: id }
    }
    const teachers = await userModel.find(filter, { email: 1, name: 1, role: 1 }).lean()
    // if (!user) {
    //   console.log('error', 'E-Mail exists already, please pick a different one.')
    //   return res.status(401).json({ Suceess: false, msg: 'E-Mail exists already, please pick a different one.' })
    // }
    return res.status(200).json({ suceess: true, msg: 'Sucessfully Done', data: teachers })
  } catch (e) {
    console.log('error', e)
    return res.status(e.status || 500).json({ suceess: false, msg: e.message, data: {} })
  }
}