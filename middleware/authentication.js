const jwt = require('jsonwebtoken');
require("dotenv").config();
const createCookie = require("../utils/createCookie");

const validateToken = (token, secret) => {
    return jwt.verify(token, secret);
}

const authenticate = async (req, res, next) => {
    const { refreshCookie, accessCookie } = req.signedCookies;


    if (accessCookie) {
        const User = validateToken(accessCookie, process.env.ACCESS_TOKEN_SECRET);
        req.User = User;
        return next();

    }
    if (!refreshCookie) {
        return res.redirect('/account');
    }
    const User = validateToken(refreshCookie, process.env.REFRESH_TOKEN_SECRET);
    req.User = User;
    createCookie(res, User.user, User.refreshTokenValue);
    next();

}

module.exports = { authenticate };