
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
    const { username, email, password, bio, profilePicture } = req.body;

    const isUserExists = await userModel.findOne(
        {
            $or: [
                { email },
                { username }
                // or operator checks for one of the above email or password
            ]
        }
    );

    if (isUserExists) {
        return res.status(409).json({
            message: (isUserExists.email === email) ? "User with this email already exists" : "User with this username already exists"
        })
    }

    const user = await userModel.create({
        username, email, password: crypto.createHash("sha256").update(password).digest("hex"), bio, profilePicture
    });

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET, { expiresIn: "1d" }
    );

    res.cookie("jwt_token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture
        }
    })

}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })

    if (!isUserExists) {
        return res.status(404).json({
            message: "user not registered"
        })
    }

    isPasswordCorrect = isUserExists.password === crypto.createHash("sha256").update(password).digest("hex");

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Password incorrect"
        })
    }

    const token = jwt.sign({
        id: isUserExists._id
    },
        process.env.JWT_SECRET, { expiresIn: "1d" }
    )

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "login successfull",
        user: {
            username: isUserExists.username,
            email: isUserExists.email,
            bio: isUserExists.bio,
            profilePicture: isUserExists.profilePicture
        }
    })
}

module.exports = { registerController, loginController }