const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already exists"],
        required: [true, "username is required"]
    },
    email: {
        type: String,
        unique: [true, "email already exists"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false // while fetching data from frontend it doesn't send passward by defalult
    },
    bio: String,
    profilePicture: {
        type: String,
        default: "https://ik.imagekit.io/idpazl1kqx/default-avatar-profile.webp"
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;