const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  t_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  c_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  sec_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  },
  semester: {
    type: String
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F']
  }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
