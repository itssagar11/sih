
const register=(req,res)=>{
     res.status(200).send("register");
}

const login=(req,res)=>{
    res.status(200).send("login");
}

const logout=(req,res)=>{
    res.status(200).send("logout");
}

module.exports={
    register,
    login,
    logout
}