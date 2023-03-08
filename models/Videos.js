const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  role: { type: String },
  name: { type: String },
  password: { type: String },
  email: { type: String }
});

const teacherSchema = new mongoose.Schema({
  t_id: { type: String, required: true, unique: true },
  user_id: { type: String, ref: 'User' }
});

const videosSchema = new mongoose.Schema({
  // v_id: { type: String, required: true, unique: true },
  title: { type: String },
  t_id: { type: String, ref: 'Teacher' },
  session: { type: String }
});

const videoDataSchema = new mongoose.Schema({
  v_data_id: { type: String, required: true, unique: true },
  v_id: { type: String, ref: 'Videos' },
  topic_id: { type: String, ref: 'List_Topic' },
  start_time: { type: String },
  end_time: { type: String }
});

const User = mongoose.model('User', userSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const Videos = mongoose.model('Videos', videosSchema);
const VideoData = mongoose.model('VideoData', videoDataSchema);

module.exports = {
  User,
  Teacher,
  Videos,
  VideoData
};
