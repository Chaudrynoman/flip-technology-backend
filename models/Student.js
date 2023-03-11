const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
//   s_id: {
//     type: String,
//     required: true,
//     unique: true
//   },
  user_id: {
    type: String,
    ref: 'User'
  },
  sec_id: {
    type: String,
    ref: 'Section'  // This sets up the reference to the Section model
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
