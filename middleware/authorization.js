const userAuthModel = require("../models/userAuthModel");


const authorize = async (req, res, next) => {
    const [[User, __], _] = await userAuthModel.findUser("id", req.User.id);
    if (User.role === "employee") {
        res.redirect("/emp");
    }
    if (User.role === "admin") {
        res.redirect("/admin");
    }
    if (User.role === "user") {
        res.redirect("/user");
    }

}

module.exports = { authorize };