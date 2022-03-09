const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const authRoute = require('./Router/Auth-router');
const usersRoute = require('./Router/User-router');
const postsRoute = require('./Router/Post-router');
const passwordRoute = require("./Router/PasswordReset-router");
const categoriesRoute = require("./Router/CategoryRoute");
const cookieParser = require('cookie-parser');
const path = require("path");
const cors = require('cors');

// env file config
dotenv.config();

// corse config
app.use(cors());

// path
app.use("/api/upload", express.static(path.join(__dirname, "upload")))

// req body reciver
app.use(express.json());

// cookie parser
app.use(cookieParser());

// mongodb conection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => { console.log("databess has been conected !") });

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/category", categoriesRoute);
app.use("/api/password", passwordRoute);

// port number
const PORT = process.env.PORT || 5000;

// app host port

app.listen(PORT, () => { console.log("server is running"); });