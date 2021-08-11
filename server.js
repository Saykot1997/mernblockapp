const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const authRoute = require('./Router/Auth-router');
const usersRoute =require('./Router/User-router');
const postsRoute = require('./Router/Post-router');
const categoriesRoute = require('./Router/Catagory-router');
const multer = require('multer')
const cookieParser = require('cookie-parser');
const path = require("path");
// const authgurd = require('./authgard/authgurd');

// env file config
dotenv.config();

// path

app.use("/upload", express.static(path.join(__dirname,"/upload")))

// req body reciver
app.use(express.json());

// cookie parser
app.use(cookieParser());


// databess conection
mongoose.connect(process.env.DATA_BESS_URL,{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false }).then(console.log('datadess connected!')).catch(err=>{console.log(err)})

// multer images upload

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
    cb(null, 'upload') 
  },

  filename:(req, file, cb)=>{
    cb(null,file.originalname)
  }
})

const upload = multer({storage:storage,fileFilter:(req,file,cb)=>{
  if( 
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ){
    cb(null,true)
  }else{
    cb(new Error("only jpg,jpeg and png are alowed."))
  }

}})

app.post('/upload',upload.single('files'),(req, res)=>{
     res.status(200).send(req.file) 
});

// routes

app.use("/auth",authRoute);
app.use("/users",usersRoute);
app.use("/posts",postsRoute);
app.use("/category",categoriesRoute);

// error handler 

app.use((err,req,res,next)=>{
  if(err){
    res.status(503).send(err.message)
  }else{
    res.status(200).send("success")
  }
})

// port number

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/clint/build")))

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"clint","build","index.html"))
  })
}

// app host port
app.listen(PORT,()=>{
    console.log("server is running");
})