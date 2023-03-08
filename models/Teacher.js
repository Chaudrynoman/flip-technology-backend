const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
//   t_id: {
//     type: String,
//     required: true,
//     unique: true
//   },
  user_id: {
    type: String,
    ref: 'User'  // This sets up the reference to the User model
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
