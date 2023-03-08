const express = require ('express');
const router = express.Router();
const controller = require('../controllers/subject');
const isAuth = require('../middleware/isAuth')
const { checkRole } = require('../middleware/check-role');
const { body } = require('express-validator');


router.get('/subject', isAuth, controller.getSubjects);

router.post('/subject', [
    body('name', 'subject Name has to be valid.')
      .isAlphanumeric(),
    body('code', 'Subject Code has to be valid.')
      .isAlphanumeric()
],isAuth, checkRole('admin'), controller.insertSubjects);


module.exports = router;