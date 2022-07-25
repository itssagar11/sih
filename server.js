const { response } = require('express');
const express = require('express');
require("dotenv").config();

const authRouter = require("./routes/authRoutes");

const app = express();


//MIDDLEWARE
app.use(express.json());
app.use((err, req, res, next) => {
    res.status(500).json({
        message: "something went wrong"
    });
});


//ROUTES
app.get('/', express.static('public'));
app.use('/api/v1', authRouter);




const startServer = () => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`server started at port: ${PORT}`);
    });
}

startServer();
