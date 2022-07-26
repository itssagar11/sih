
const userAuthModel = require("../models/userModel");
const customError = require("../utils/customErrors");


const register = async (req, res, next) => {
    const { name, password, email, role } = req.body;
    const [FindUser, _] = await userAuthModel.findUser(email);
    if (FindUser) {
        var error = new customError.badRequestError("invalid email try again");
        error.origin = "email";
        throw error;
    }

    let user = new userAuthModel(name, password, email, role);
    await user.save();
    res.status(200).json({
        status: true,
        origin: "registered",
        message: "registered successfully"
    });
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
    logout
}