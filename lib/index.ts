import "./configs";
import * as express from "express";
import { json, urlencoded } from "body-parser";
import AuthController from "./app/controllers/AuthController";
import UserController from "./app/controllers/UserController";
import LessonController from "./app/controllers/LessonController";

const app = express();

const authRouter = new AuthController;
const userRouter = new UserController;
const lessonRouter = new LessonController;
const { PORT } = process.env;

app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/auth', authRouter.Router);
app.use('/user', userRouter.Router);
app.use('/lesson', lessonRouter.Router);

app.listen(PORT , () => console.log(`PORT: ${PORT}`));

export default app;
