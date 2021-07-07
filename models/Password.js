const mongoose = require("mongoose");
const crypto = require("crypto");

const PasswordSchema = new mongoose.Schema({
    app: {
        type: String,
        unique: false,
        required: [true, "Please provide name of the site or app"]
    },
    username : {
        type: String,
        default: "No username provided."
    },
    iv: {
        type: String
    },
    content: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Password = mongoose.model("Password", PasswordSchema);
module.exports = Password;