require("dotenv").config();

module.export={
    host:`${process.env.MAIL_HOST}`,
    prot:`${process.env.MAIL_PORT}`,
    secure:`${process.env.MAIL_SECURE}`,
   auth:{
    user:`${process.env.MAIL_USER}`,
    pass:`${process.env.MAIL_PASSWORD}`
   }

}