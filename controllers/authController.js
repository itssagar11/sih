
const userAuthModel = require("../models/userAuthModel");
const customError = require("../utils/customErrors");
const Mail = require("../utils/mailer");
const crypto = require('crypto');
require('dotenv').config();

const register = async (req, res, next) => {
    const { name, password, email, role } = req.body;
    const [[FindUser, __], _] = await userAuthModel.findUser(email);

    if (FindUser) {
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
    const [[User, __], _] = await userAuthModel.findUser(email);

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

    if (User.verified) {
        var error = new customError.badRequestError("already verified");
        error.origin = "verifyMail";
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
    const [[User, __], _] = await userAuthModel.findUser(email);

    if (!User) {
        var error = new customError.badRequestError("please  try again");
        error.origin = "verifyMail";
        throw error;
    }
    if (User.verified) {
        var error = new customError.badRequestError("already verified");
        error.origin = "verifyMail";
        throw error;
    }

    if (token != User.verificationToken) {
        var error = new customError.badRequestError("please try again");
        error.origin = "verifyMail";
        throw error;
    }
    await userAuthModel.updateValidation(email);
    res.status(200).redirect("/");

}

const login = (req, res) => {
    res.status(200).send("login");
}

const logout = (req, res) => {
    res.status(200).send("logout");
}

module.exports = {
    register,
    login,
    logout,
    sendVerificationEmail,
    verifyMail
}