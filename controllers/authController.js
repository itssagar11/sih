
const userAuthModel = require("../models/userModel");

const register = (req, res) => {
    const { name, password, email, role } = req.body;
    let user = new userAuthModel(name, password, email, role);
    user = user.save();
    res.status(200).json({ message: "registered successfully" });


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