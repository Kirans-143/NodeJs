const express = require("express");
const { connectMongoDB } = require("./connection");

const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/user.routes");

const app = express();
const PORT = 8000;

//Connection
connectMongoDB("mongodb://127.0.0.1:27017/testApp")
  .then(() => {
    console.log("MongoBD Connected");
  })
  .catch(() => {
    console.log("Error occured");
  });

//MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
