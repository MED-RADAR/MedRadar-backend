const express = require("express");
const { APP_PORT } = require("./config");
const app = express();
const cors = require("cors");
const PORT = APP_PORT || 5500;
const connectDB = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
connectDB();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_HOSPITAL,
      process.env.FRONTEND_USER,
      process.env.FRONTEND_ADMIN,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const hospitalRouter = require("./routes/hospitalRoutes");
const userRouter = require("./routes/userRoutes");


app.use("/hospital", hospitalRouter);
app.use("/user", userRouter);

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Listning on port : ${PORT}`);
});
