const { express } = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require('express');
require("dotenv").config();
require("express-async-errors");
const authRouter = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const globalErrorHandler = require("./middleware/globalErrorHandler")
const { authenticate } = require("./middleware/authentication");

const app = express();


//MIDDLEWARE
app.use(cors({ origin: "http://localhost:4000" }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));





//ROUTES
// app.use("/account", authenticate, express.static("publicAuthenticated"));
// app.use(express.static('public'));

// app.use('/api/v1/auth', errorHandler(authRouter));

// app.use(globalErrorHandler);


const startServer = () => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`server started at port: ${PORT}`);
    });
}

startServer();
