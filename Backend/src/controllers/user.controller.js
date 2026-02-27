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



    const follow = await followModel.create({
        followee: followeeUsername, follower: followerUsername
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

// async function respondToFollowRequest(req, res) {

//     const followeeUsername = req.userDets.username;
//     const followerUsername = req.params.username;
//     const { action } = req.body;

//     if (!["accepted", "rejected"].includes(action)) {
//         return res.status(400).json({
//             message: "Invalid action"
//         });
//     }

//     const followRequest = await followModel.findOne({
//         follower: followerUsername,
//         followee: followeeUsername,
//         status: "pending"
//     });

//     if (!followRequest) {
//         return res.status(404).json({
//             message: "No pending request found"
//         });
//     }

//     followRequest.status = action;
//     await followRequest.save();

//     res.status(200).json({
//         message: `Follow request ${action}`
//     });
// }


async function fetchUserController(req, res) {
    const userName = req.userDets.username;

    const users = await userModel.find({
        username: { $ne: userName }
    });

    if (!users) {
        return res.status(400).json({
            message: "No users available"
        });
    }

    res.status(200).json({
        message: "Users fetched successfully",
        users
    });
}

async function fetchFollowerFolloweeController(req, res) {
    const userName = req.userDets.username;

    const myFollowers = await followModel
        .find({ followee: userName })
        .select("follower -_id");

    const myFollowing = await followModel
        .find({ follower: userName })
        .select("followee -_id");

    const followers = myFollowers.map(doc => doc.follower);
    const followings = myFollowing.map(doc => doc.followee);

    res.status(200).json({
        message: "Fetch successfull",
        followers,
        followings
    })
    

}


module.exports = {
    userFollowController,
    userUnfollowController,
    fetchUserController,
    fetchFollowerFolloweeController
}