const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  s_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  time: { type: String },
  v_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Videos' },
  session: { type: String },
  date: { type: Date },
}, { timestamps: true });

const History = mongoose.model('History', historySchema);

module.exports = History;
