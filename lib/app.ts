import * as express from "express";
import * as cors from "cors";
import { json, urlencoded } from "body-parser";

import authRouter from "./app/controllers/AuthController";
import userRouter from "./app/controllers/UserController";
import contentRouter from "./app/controllers/ContentController";
import projectRouter from "./app/controllers/ProjectController";
import Auth from "./app/middlewares/auth";
import filterRouter from "./app/controllers/FilterController";

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middlewares();
    }

    private middlewares() {
        this.express.use(urlencoded({ extended: true }));
        this.express.use(json());
        this.express.use(cors());
        this.express.use("/auth", authRouter);
        this.express.use("/filter", filterRouter);
        this.express.use("/user", [Auth, userRouter]);
        this.express.use("/content", [Auth, contentRouter]);
        this.express.use("/project", [Auth, projectRouter]);
    }
}

export default new App().express;
