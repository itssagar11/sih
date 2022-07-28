const express = require('express');
const router = express.Router();
const userAuthModel = require("../models/userAuthModel");

const authorize = (role) => {
    return async (req, res, next) => {
        const [[User, __], _] = await userAuthModel.findUser("id", req.User.id);
        if (User.role != role) {
            if (["admin", "employee", "user"].includes(role)) {
                return res.redirect(`/${User.role}`);
            }
        } next();

    }
}
const authorizeAdmin = authorize("admin");
const authorizeEmp = authorize("employee");
const authorizeUser = authorize("user");


router.use("/admin", authorizeAdmin, express.static("publicAuthenticated/admin"));
router.use("/employee", authorizeEmp, express.static("publicAuthenticated/emp"));
router.use("/user", authorizeUser, express.static("publicAuthenticated/user"));



module.exports = router;