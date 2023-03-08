const mongoos = require('mongoose');

const subjectSchema = new mongoos.Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true,
    },
    weeks:[{
        type:Array
    }],
    videoData:[{
        type:Array
    }],
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const userModel = mongoos.model('subjects', subjectSchema);
module.exports=userModel;