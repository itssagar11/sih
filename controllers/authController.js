
const userAuthModel = require("../models/userAuthModel");
const customError = require("../utils/customErrors");
const Mail = require("../utils/mailer");
const createCookie = require("../utils/createCookie");
const crypto = require('crypto');
require('dotenv').config();

const findUser = async (parameter, value) => {
    const [[User, __], _] = await userAuthModel.findUser(parameter, value);
    return User;

}

const register = async (req, res, next) => {
    const { name, password, email, role } = req.body;
    // const [[User, __], _] = await userAuthModel.findUser(email);
    const User = await findUser("email", email);

    if (User) {
        var error = new customError.badRequestError("invalid email try again");
        error.origin = "email";
        throw error;
    }
    const verificationToken = crypto.randomBytes(45).toString('hex');
    let user = new userAuthModel(name, password, email, role, verificationToken);
    await user.save();


    res.status(200).json({
        status: true,
        origin: "registered",
        message: " check mail for verification"
    });
}


const sendVerificationEmail = async (req, res) => {
    const { email, password } = req.body;
    // const [[User, __], _] = await userAuthModel.findUser(email);
    const User = await findUser("email", email);


    if (!User) {
        var error = new customError.badRequestError("invalid email try again");
        error.origin = "sendVerificationMail";
        throw error;
    }
    const passwordComparison = await userAuthModel.comparePassword(password, User.password);
    if (!passwordComparison) {
        var error = new customError.badRequestError("wrong password");
        error.origin = "password";
        throw error;
    }


    const { name, verificationToken, verified } = User;
    if (verified) {
        var error = new customError.badRequestError("your mail is verified");
        error.origin = "sendVerificationMail";
        throw error;
    }
    const origin = process.env.ORIGIN;

    await Mail.verificationMail({
        name: name,
        email: email,
        verificationToken: verificationToken,
        origin: origin
    });
    res.status(200).json({
        status: true,
        origin: "sendVerificationMail",
        message: "mail sent"
    });
}

const verifyMail = async (req, res) => {
    const { token, email } = req.query;
    // const [[User, __], _] = await userAuthModel.findUser(email);
    const User = await findUser("email", email);
    if (User && !User.verified && (token == User.verificationToken)) {
        await userAuthModel.update("verified", 1, email);
    }

    res.status(200).redirect("/");

}

const login = async (req, res) => {
    const { email, password } = req.body;
    // const [[User, __], _] = await userAuthModel.findUser(email);
    const User = await findUser("email", email);

    if (!User) {
        var error = new customError.badRequestError("please  try again");
        error.origin = "not registered";
        throw error;
    }

    const passwordComparison = await userAuthModel.comparePassword(password, User.password);
    if (!passwordComparison) {
        var error = new customError.badRequestError("try again");
        error.origin = "wrong password";
        throw error;
    }
    if (!User.verified) {
        var error = new customError.badRequestError("please  try again");
        error.origin = "please verify mail";
        throw error;
    }

    const refreshToken = crypto.randomBytes(40).toString('hex');
    user = { name: User.name, email: User.email, role: User.role, verified: User.verified };
    createCookie(res, user, refreshToken);
    res.status(200).json({ status: true, origin: "logged in " });
}

const logout = (req, res) => {
    if (req.signedCookies.accessCookie) res.cookie('accessCookie', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    if (req.signedCookies.refreshCookie) res.cookie('refreshCookie', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });

    res.status(200).redirect("/");
}

module.exports = {
    register,
    login,
    logout,
    sendVerificationEmail,
    verifyMail
}