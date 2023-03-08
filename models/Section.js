const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  sec_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: null,
  },
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
