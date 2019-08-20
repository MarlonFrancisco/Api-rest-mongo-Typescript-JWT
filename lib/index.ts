import * as express from "express";
import * as cors from "cors";
import { json, urlencoded } from "body-parser";
import "dotenv/config";

import AuthController from "./app/controllers/AuthController";
import UserController from "./app/controllers/UserController";
import LessonController from "./app/controllers/LessonController";
import Auth from "./app/middlewares/auth";

const app = express();

const authRouter = new AuthController();
const userRouter = new UserController();
const lessonRouter = new LessonController();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/auth", Auth);
app.use("/user", Auth);

app.use(cors());
app.use("/auth", authRouter.Router);
app.use("/user", userRouter.Router);
app.use("/lesson", lessonRouter.Router);

app.get("/", (req, res) => {
    res.status(200).send("ok!");
});

app.listen(process.env.PORT, () => console.log(`PORT: ${process.env.PORT}`));

export default app;
