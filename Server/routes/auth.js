const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');
const jwtMiddleware = require('../middlewares/JwtMiddleware');

router.get('/google/redirect', AuthController.loginRedirect);
router.get('/google', AuthController.loginGoogle);
//User
router.post('/addNewUser', AuthController.addUser);
router.post('/login', AuthController.loginUser);
router.post('/logout', AuthController.logoutUser);
router.get('/verifyEmail', AuthController.verifyEmail);
router.post('/resendVerifyEmail', AuthController.resendVerifyRegistrationEmail);
//Forgot Password
router.post('/forgotPassword', AuthController.forgotPassword);
router.get('/verifyFotgotPassword', AuthController.verifyForgotPassword);
router.post('/updatePassword', AuthController.updatePassword);
router.post('/resendVerifyFotgotPassword', AuthController.resendForgotPasswordEmail);

//Change Email
router.post('/newEmail', AuthController.changeEmail);
router.get('/verifyNewEmail', AuthController.verifyChangeEmail);
router.post('/resendVerifyChangeEmail', AuthController.resendVerifyChangeEmail);

//Change Password
router.post('/changePassword', jwtMiddleware.verifyToken, AuthController.changePassword);

//QUERY CHECK
router.get('/checkUsername', AuthController.checkUsername);
router.get('/checkEmail', AuthController.checkEmail);

//Token
router.post('/refreshToken', AuthController.requestRefreshToken);

module.exports = router;
