const mongoose = require('mongoose');

const listTopicSchema = new mongoose.Schema({
  less_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LessonPlan'
  },
  week: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('List_Topic', listTopicSchema);
