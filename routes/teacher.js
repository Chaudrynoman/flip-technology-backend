const express = require ('express');
const router = express.Router();
const controller = require('../controllers/teacher');
const isAuth = require('../middleware/isAuth')
const { checkRole } = require('../middleware/check-role');
const { body, query } = require('express-validator');


router.get('/teacher', isAuth, controller.getTeachers);

router.post('/video', [
      body('url', 'url has to be valid.')
      .exists(),
    query('subjectID')
      .isMongoId(),
    query('weekNo', 'weekNo has to be valid.')
      .exists(),
    query('chapter', 'chapter has to be valid.')
      .isAlphanumeric()
],isAuth, checkRole('teacher'), controller.postVideo);

router.get('/video', [
  query('teacherID')
    .isMongoId(),
  query('weekNo', 'weekNo has to be valid.')
    .exists(),
  query('chapter', 'chapter has to be valid.')
    .isAlphanumeric()
],isAuth, checkRole('user'), controller.getVideo);


module.exports = router;