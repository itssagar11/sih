const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout,
    sendVerificationEmail,
    verifyMail
} = require("../controllers/authController");

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/sendVerification').post(sendVerificationEmail);
router.route('/verifyMail').get(verifyMail);

module.exports = router;