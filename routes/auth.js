const express = require ('express');
const { body } = require('express-validator')

const router = express.Router();
const controller = require('../controllers/auth');
const isAuth = require('../middleware/isAuth')

router.post('/register',
[
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      // .custom((value, { req }) => {
      //   return User.findOne({ Email: value }).then(userDoc => {
      //     if (userDoc) {
      //       return Promise.reject(
      //         'E-Mail exists already, please pick a different one.'
      //       );
      //     }
      //   });
      // })
      .normalizeEmail(),
    body(
      'name',
      'Please enter a valid Name with Minimun 5 and maximun 15 Alphabats.',
    )
      .isLength({ min: 5, max: 15 })
      .isAlpha(),
    body(
      'password',
      'Please enter a Password with only numbers and text and at least 5 characters.',
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body(
      'role',
      'please enter only admin or user or teacher.',
    )
      .custom((value) => {
        if (!(value === 'admin' || value === 'user' || value === 'teacher')) {
          throw new Error('please enter only admin or user.');
        }
        return true;
      })
      .isAlpha()
      .trim(),
], controller.insertUser);

router.post('/login',
[
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
], controller.login);
router.get('/profile', isAuth, controller.getprofile);


module.exports = router;