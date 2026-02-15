
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
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

    const hash = await bcrypt.hash(password, 10)
    //here 10 means how many layers you want to hash your password it is called salt

    const user = await userModel.create({
        username, email, password: hash, bio, profilePicture
    });

    const token = jwt.sign({
        id: user._id
    },
        process.env.JWT_SECRET, { expiresIn: "1d" }
    );

    res.cookie("token", token);

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

    isPasswordCorrect = await bcrypt.compare(password, isUserExists.password); 
    // it is necessary to stored password at second place and login password at first place

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

    res.cookie("token", token);

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