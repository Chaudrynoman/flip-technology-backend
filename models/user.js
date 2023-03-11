const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
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
// mongoose.deleteModel('User')
const User = mongoose.model('User', userSchema);

module.exports = User;
