import express from "express";
import mongoose from "mongoose";
import { Login } from "./controllers/userController.js";
import { register } from "./controllers/lecteurContoller.js";
import { categoryRoute } from "./routes/categoryRoutes.js";
import { bookRoute } from "./routes/bookRoutes.js";
import { adminRoute } from "./routes/adminRoutes.js";
import { lecteurRoute } from "./routes/lecteurRoutes.js";
import cookieParser from "cookie-parser";
mongoose.set("strictQuery", false);
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect(
    "mongodb+srv://admin:cK0YhUMPlsVUPsP3@beta.swesewy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(
        "database connected, app started and listening on http://localhost:3000"
      );
    });
  });

app.use("/admin", adminRoute);
app.use("/profile", lecteurRoute);
app.use("/categories", categoryRoute);
app.use("/books", bookRoute);

app.post("/register", register);

app.post("/login", Login);
