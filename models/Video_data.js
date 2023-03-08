// import mongoose and create a connection to your MongoDB database
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/Flip_fyp');

// define a schema for the Student table
const studentSchema = new mongoose.Schema({
  s_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  sec_id: String
});

// create a Mongoose model for the Student table using the schema
const Student = mongoose.model('Student', studentSchema);
