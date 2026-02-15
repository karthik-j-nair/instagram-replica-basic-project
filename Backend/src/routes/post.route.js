const experss = require("express");
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() })

const postRouter = experss.Router();

postRouter.post("/", upload.single("image"), postController.createPostController);

postRouter.get("/", postController.getPostController);

postRouter.get("/details/:postId", postController.getPostDetailController);

module.exports = postRouter;