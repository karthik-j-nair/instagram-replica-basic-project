require("dotenv").config();
const app = require("./src/app");
const connnectToDB = require("./src/config/database");

connnectToDB();

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})