import * as express from "express";
import * as cors from "cors";
import { json, urlencoded } from "body-parser";
import "dotenv/config";

import AuthController from "./app/controllers/AuthController";
import UserController from "./app/controllers/UserController";
import ContentController from "./app/controllers/ContentController";
import AdminController from "./app/controllers/AdminController";
import Auth from "./app/middlewares/auth";

const app = express();

const authRouter = new AuthController().Router;
const userRouter = new UserController().Router;
const contentRouter = new ContentController().Router;
const adminRouter = new AdminController().Router;

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/content", Auth);
app.use("/user", Auth);

app.use(cors());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/content", contentRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => console.log(`PORT: ${process.env.PORT}`));

export default app;
