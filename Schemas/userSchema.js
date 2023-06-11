require("dotenv").config();
const {default:mongoose} = require("mongoose");
const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
    email: String,
    password:String

});

let secret = process.env.SECRET;

userSchema.plugin(encrypt, {secret:secret, encryptedFields:["password"]});

module.exports = mongoose.model("User", userSchema);