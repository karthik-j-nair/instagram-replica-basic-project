const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");


const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    // console.log(req.body, req.file);

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorised user, access denied"
        })
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorised user, access denied"
        })
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "insta-replica-posts-image"
    })


    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })


    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function getPostController(req, res) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    const userId = decoded.id;

    const posts = await postModel.find({ user: userId });

    if(!posts) {
        return res.status(200).json({
            messages: "No posts available"
        })
    }

    res.status(200).json({
        message: "Fetched all posts",
        posts
    })

}

async function getPostDetailController(req, res) {
    
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }

    let decoded = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }

    const postId = req.params.postId;
    const userId = decoded.id;

    const post = await postModel.findById(postId);


    if(!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId;

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden content"
        })
    }

    res.status(200).json({
        message: "Post fetched Successfully",
        post
    })
}

module.exports = { createPostController, getPostController, getPostDetailController };