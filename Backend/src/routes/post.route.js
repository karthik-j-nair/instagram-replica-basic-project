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

module.exports = postRouter;