// import mongoose and create a connection to your MongoDB database
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/Flip_fyp');

// define a schema for the Student table
const videosSchema = new mongoose.Schema({
    v_id: { type: String, ref: 'Videos' },
  topic_id: { type: String, ref: 'List_Topic' },
  start_time: { type: String },
  end_time: { type: String },
  sec_id: String
});

// create a Mongoose model for the Student table using the schema
const Student = mongoose.model('Video_data', videosSchema);
module.exports = Student;
