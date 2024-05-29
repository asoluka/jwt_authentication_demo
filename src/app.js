const express = require("express");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);

module.exports = app;
