const experss = require("express");
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() })

const postRouter = experss.Router();

postRouter.post("/", upload.single("image"), identifyUser,postController.createPostController);

postRouter.get("/", identifyUser, postController.getPostController);

postRouter.get("/details/:postId", identifyUser, postController.getPostDetailController);

postRouter.post("/like/:postId", identifyUser, postController.likePostController);

postRouter.post("/unlike/:postId", identifyUser, postController.unLikePostController)

/* 
@routes GET api/posts/feed
@desciption gets all the post available in the db
@access only loggedin user
*/

postRouter.get("/feed", identifyUser, postController.getFeedController)

module.exports = postRouter;