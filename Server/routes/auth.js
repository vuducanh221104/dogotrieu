const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');
const jwtMiddleware = require('../middlewares/JwtMiddleware');

// Google OAuth routes
// router.get('/google', AuthController.loginGoogle);
// router.get('/google/redirect', AuthController.loginRedirect);
router.post('/google/verify', AuthController.verifyGoogleToken);

//Admin
router.post('/admin/login', AuthController.loginAdmin);
router.post('/admin/logout', AuthController.logoutAdmin);
router.post('/admin/refreshToken', AuthController.requestRefreshTokenAdmin);
router.post('/admin/users', jwtMiddleware.verifyTokenAdmin, AuthController.addUserByAdmin);

//User Management
router.get('/users', AuthController.getAllUsers);
router.patch('/users/:userId', jwtMiddleware.verifyTokenAdmin, AuthController.updateUserByAdmin);
router.delete('/users/:userId', jwtMiddleware.verifyTokenAdmin, AuthController.deleteUser);

//User
router.post('/addNewUser', AuthController.addUser);
router.post('/login', AuthController.loginUser);
router.post('/logout', AuthController.logoutUser);
router.get('/verifyEmail', AuthController.verifyEmail);
router.get('/verifyResendEmail', AuthController.verifyResendEmail);
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
// router.post('/changePassword', jwtMiddleware.verifyToken, AuthController.changePassword);
router.post('/changePassword', AuthController.changePassword);

//QUERY CHECK
router.get('/checkUsername', AuthController.checkUsername);
router.get('/checkEmail', AuthController.checkEmail);

//Token
router.post('/refreshToken', AuthController.requestRefreshToken);

//Update
router.patch('/updateInfoUser', AuthController.updateInfoUser);

module.exports = router;
