const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  s_id: {
    type: String,
    required: true,
    ref: 'Student'
  },
  rate: {
    type: Number,
    required: true,
  },
  v_data_id: {
    type: String,
    required: true,
    ref: 'Video_data'
  },
  session: {
    type: String,
    required: true,
  },
});

const Rate = mongoose.model('Rate', rateSchema);

module.exports = Rate;
