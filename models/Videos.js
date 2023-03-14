const mongoose = require('mongoose');

const videosSchema = new mongoose.Schema({
  title: { type: String },
  t_id: { type: String, ref: 'Teacher' },
  session: { type: String }
});

const Videos = mongoose.model('Videos', videosSchema);

module.exports = {
  Videos
};
