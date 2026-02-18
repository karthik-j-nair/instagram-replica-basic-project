const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function userFollowController(req, res) {
    const followerUsername = req.userDets.username;
    const followeeUsername = req.params.username;

    if (followeeUsername === followerUsername) {
        return res.status(400).json({
            message: "You can't follow yourself"
        });
    }

    const isFolloweeValid = await userModel.findOne({
        username: followeeUsername
    });

    if (!isFolloweeValid) {
        return res.status(404).json({
            message: `Username ${followeeUsername} not available`
        });
    }

    const isFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });

    if (isFollowing) {

        if (isFollowing.status === "pending") {
            return res.status(200).json({
                message: "Follow request already sent"
            });

        }
        if (isFollowing.status === "accepted") {
            return res.status(200).json({
                message: `Already following ${followeeUsername}`
            });
        }

        if (isFollowing.status === "rejected") {
            return res.status(200).json({
                message: "Your previous request was rejected"
            });
        }

    }

    const follow = await followModel.create({
        followee: followeeUsername, follower: followerUsername, status: "pending"
    });

    res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        follow
    });


}

async function userUnfollowController(req, res) {

    const usernameOfFollowee = req.params.username;
    const usernameOfFollower = req.userDets.username;

    const isFolloweeValid = await userModel.findOne({
        username: usernameOfFollowee
    });

    if (!isFolloweeValid) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const isFollowing = await followModel.findOne({
        followee: usernameOfFollowee,
        follower: usernameOfFollower,
        status: "accepted"
    });

    if (!isFollowing) {
        return res.status(200).json({
            message: `You are not following ${usernameOfFollowee}`
        });
    }

    await followModel.findOneAndDelete({
        followee: usernameOfFollowee,
        follower: usernameOfFollower
    });

    res.status(200).json({
        message: `Unfollowed ${usernameOfFollowee} succcessfully`
    });


}

async function respondToFollowRequest(req, res) {

    const followeeUsername = req.userDets.username;
    const followerUsername = req.params.username;
    const { action } = req.body;

    if (!["accepted", "rejected"].includes(action)) {
        return res.status(400).json({
            message: "Invalid action"
        });
    }

    const followRequest = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    });

    if (!followRequest) {
        return res.status(404).json({
            message: "No pending request found"
        });
    }

    followRequest.status = action;
    await followRequest.save();

    res.status(200).json({
        message: `Follow request ${action}`
    });
}


module.exports = {
    userFollowController,
    userUnfollowController,
    respondToFollowRequest
}