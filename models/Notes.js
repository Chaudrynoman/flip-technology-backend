const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  s_id: {
    type: String,
    required: true,
    ref: 'Student'
  },
  v_data_id: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;
