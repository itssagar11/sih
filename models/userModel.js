const pool = require("../connection/dbcon");
const bcrypt = require('bcrypt');
require('dotenv').config();

class userAuthModel {
    constructor(name, password, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
    }

    async save() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        console.log(this.password);

        let query = `INSERT INTO users(
    name,
    password,
    email,
    role
  )VALUES("${this.name}","${this.password}","${this.email}","${this.role}")`;
        const [user, _] = await pool.execute(query);
        return user;

    }
}

module.exports = userAuthModel