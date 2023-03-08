const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
//   user_id: {
//     type: String,
//     required: true,
//     unique: true
//   },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin']
  },
  name: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
