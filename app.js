//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const userModel = require("./Schemas/userSchema");
const encryption = require("mongoose-encryption");

const app = express();



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/userDB');

app.get("/", (req,res)=>{
    res.render("home");
});

app.get("/login", (req,res)=>{
    res.render("login");
});

app.get("/register", (req,res)=>{
    res.render("register");

});

app.post("/register", async (req,res)=>{

    let user = await userModel.create({email:req.body.username, password:req.body.password}).catch(console.error());

    res.render("secrets");
});

app.post("/login", async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    let user = await userModel.findOne({email:username});

    if(user.password == password){
        res.render("secrets");
    }



});


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})