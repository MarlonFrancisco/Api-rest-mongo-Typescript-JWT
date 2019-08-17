import * as express from "express";
import { json, urlencoded } from "body-parser";
import configs from "./configs";
import AuthController from "./app/controllers/AuthController";
import UserController from "./app/controllers/UserController";
import LessonController from "./app/controllers/LessonController";
import * as cors from "cors";

const app = express();

const authRouter = new AuthController();
const userRouter = new UserController();
const lessonRouter = new LessonController();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors());
app.use("/auth", authRouter.Router);
app.use("/user", userRouter.Router);
app.use("/lesson", lessonRouter.Router);

app.get("/", (req, res) => {
    res.status(200).send("ok!");
});

app.listen(configs.port, () => console.log(`PORT: ${configs.port}`));

export default app;
