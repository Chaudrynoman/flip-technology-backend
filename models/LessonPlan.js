const mongoose = require('mongoose');

const lessonPlanSchema = new mongoose.Schema({
  c_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  less_id: {
    type: String,
    required: true,
    unique: true
  }
});

const LessonPlan = mongoose.model('LessonPlan', lessonPlanSchema);

module.exports = LessonPlan;
