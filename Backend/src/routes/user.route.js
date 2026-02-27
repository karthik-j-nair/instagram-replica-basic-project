const express = require("express");
const verifyUser = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/follow/:username", verifyUser, userController.userFollowController);

userRouter.post("/unfollow/:username", verifyUser, userController.userUnfollowController);

// userRouter.patch("/follow/respond/:username", verifyUser, userController.respondToFollowRequest);


/* 
@route GET /api/user/fetch-users
@desc Fetch all users rather than logged in user
@access Private
*/
userRouter.get("/fetch-users", verifyUser, userController.fetchUserController);


/* 
* @routes GET /api/user/follower-followee
* @desc Fetch followers and followees of logged in user
* @access Private
*/

userRouter.get("/follower-followee", verifyUser, userController.fetchFollowerFolloweeController)

module.exports = userRouter;