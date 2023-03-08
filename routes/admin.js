const express = require ('express');
const router = express.Router();
const controller = require('../controllers/admin');
const isAuth = require('../middleware/isAuth')
const { checkRole } = require('../middleware/check-role');
const { body } = require('express-validator');


// router.get('/teachers', isAuth, checkRole('admin'), controller.getTeachers);

router.post('/assign/subject', [
    body('id').isMongoId(),
    body('subjName', 'subject Name has to be valid.')
      .isAlphanumeric()
      .trim(),
    body('subjCode', 'Subject Code has to be valid.')
      .isAlphanumeric()
],isAuth, checkRole('admin'), controller.assignSubject);

router.post('/assign/teachers', [
  body('teacherID').isMongoId(),
  body('studentID').isMongoId()
],isAuth, checkRole('admin'), controller.assignTeacher);


module.exports = router;