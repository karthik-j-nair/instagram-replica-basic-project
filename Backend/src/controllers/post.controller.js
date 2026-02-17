const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");


const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "insta-replica-posts-image"
    })


    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.userDets.id
    })


    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function getPostController(req, res) {

    const userId = req.userDets.id;

    const posts = await postModel.find({ user: userId });

    res.status(200).json({
        message: "Fetched all posts",
        posts
    })

}

async function getPostDetailController(req, res) {

    const postId = req.params.postId;
    const userId = req.userDets.id;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
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