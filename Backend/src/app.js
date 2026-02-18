const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());

/* 
* requiring routes
 */
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");

/* 
* @routes 
*/

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/user", userRouter);

module.exports = app;