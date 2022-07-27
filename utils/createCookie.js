const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJwt = ({ payload }, secret) => {
    const token = jwt.sign(payload, secret);
    return token;
}

const createCookie = async (res, user, refreshTokenValue) => {
    const accessToken = createJwt({ payload: user }, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = createJwt({ payload: {user, refreshTokenValue }}, process.env.REFRESH_TOKEN_SECRET);

   

    res.cookie('accessCookie', accessToken, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT==='PRODUCTION',
        signed: true,
        maxAge: process.env.ACCESS_COOKIE_EXPIRY,
    });


    res.cookie('refreshCookie', refreshToken, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT==='PRODUCTION',
        signed: true,
        maxAge:process.env.REFRESH_COOKIE_EXPIRY,
    });

}

module.exports = createCookie