const express = require("express");
const verifyUser = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/follow/:username", verifyUser, userController.userFollowController);

userRouter.post("/unfollow/:username", verifyUser, userController.userUnfollowController);

userRouter.patch("/follow/respond/:username", verifyUser, userController.respondToFollowRequest);

module.exports = userRouter;