const mongoose = require("mongoose");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
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

async function likePostController(req, res) {
    const postId = req.params.postId;
    const username = req.userDets.username;

    // Validate if postId is a valid MongoDB ObjectId and also require mongoose
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({
            message: "Invalid post ID"
        });
    }

    const isPostExists = await postModel.findById(postId);

    if (!isPostExists) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const isAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: username
    });

    if (isAlreadyLiked) {
        return res.status(200).json({
            message: "You already like the post"
        });
    }

    const like = await likeModel.create({
        post: postId, user: username
    });

    res.status(201).json({
        message: "You liked the post"
    });

}

async function unLikePostController(req, res) {
    const postId = req.params.postId
    const username = req.userDets.username

    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })

    if (!isLiked) {
        return res.status(400).json({
            message: "Post not liked"
        });
    }

    await likeModel.findOneAndDelete({ _id: isLiked._id });

    return res.status(200).json({
        message: "post unliked successfully."
    });
}

async function getFeedController(req, res) {

    const user = req.userDets;
    const posts = await Promise.all((await postModel.find().sort({ _id: -1 }).populate("user").lean())
        // sort({ _id: -1 }) we use this to sort data according to the recent post that is recently created post will be showing on the top of the feed
        // we add lean method to convert mongoose object to normal object to add like property (in mongoose object we cant add a property)
        .map(async (post) => {

            const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id
            })

            post.isLiked = !!isLiked // one ! means converting into false and second ! means converting into true

            return post

        }))
    // populate injects the user details in place of userid which was stored while creating a post

    res.status(200).json({
        message: "Post fetched successfull",
        posts
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailController,
    likePostController,
    unLikePostController,
    getFeedController
};