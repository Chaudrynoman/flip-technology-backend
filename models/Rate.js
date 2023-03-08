const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  s_id: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  v_data_id: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
});

const Rate = mongoose.model('Rate', rateSchema);

module.exports = Rate;
