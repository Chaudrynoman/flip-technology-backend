const mongoose = require('mongoose');

const presentationSchema = new mongoose.Schema({
  s_id: {
    type: String,
    required: true,
  },
  topic_id: {
    type: String,
    required: true,
  },
  p_date: {
    type: Date,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  t_id: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

const Presentation = mongoose.model('Presentation', presentationSchema);

module.exports = Presentation;
