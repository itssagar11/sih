const pool = require("../connection/dbcon");
const customError = require("../utils/customErrors");
const bcrypt = require('bcrypt');
const emailValidator = require("email-validator");
require('dotenv').config();
const Validator = require('password-validator');


class userAuthModel {
    roles = ["admin", "user", "employee"];
    constructor(name, password, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
    }


    async save() {

        const nameSchema = new Validator();                //NAME VALIDATION
        nameSchema
            .is().max(30)
            .has().not().digits()
            .has().not().spaces();
        if (!nameSchema.validate(this.name)) {
            var error = new customError.badRequestError(`${nameSchema.validate(this.name, { details: true })[0].message}`);
            error.origin = "name";
            throw error;
        }

        if (!this.roles.includes(this.role)) {            //ROLE VALIDATION
            var error = new customError.badRequestError("invalid input");
            error.origin = "classified";
            throw error;
        }
        if (!emailValidator.validate(this.email)) {       //NAME VALIDATION
            var error = new customError.badRequestError("invalid email ,try again");
            error.origin = "email";
            throw error;
        }

        const schema = new Validator();                        //PASSWORD VALIDATION
        schema
            .is().min(8)
            .is().max(100)
            .has().uppercase(2)
            .has().lowercase()
            .has().digits(2)
            .has().not().spaces();
        if (!schema.validate(this.password)) {
            var error = new customError.badRequestError(`${schema.validate(this.password, { details: true })[0].message}`)
            error.origin = "password";
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        let query = `INSERT INTO users(
    name,
    password,
    email,
    role
  )VALUES("${this.name}","${this.password}","${this.email}","${this.role}")`;
        return  pool.execute(query);
    }


    static async findUser(email) {
        let query = `SELECT * FROM users WHERE email='${email}'`;
        return pool.execute(query);
    }
}

module.exports = userAuthModel