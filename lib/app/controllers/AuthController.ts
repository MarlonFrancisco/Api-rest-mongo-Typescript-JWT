import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import User from "./../models/User";
import configs from "./../../configs";
import mailer from "./../../mail";

interface IParams {
    id: string;
}

export default class AuthController {
    private router: express.Router = express.Router();

    constructor() {
        this.register();
        this.auth();
        this.forgotPassword();
    }

    private generateToken(params: IParams) {
        return jwt.sign(params, configs.hash, {
            expiresIn: 60000,
        });
    }

    private register() {
        this.router.post("/register", async (req: express.Request, res: express.Response) => {
            try {

                const user = await User.create({ ...req.body });

                if (!user) {
                    return res.status(400).send({ err: "User not was created! " });
                }

                return res.status(200).send({ user, token: this.generateToken({ id: user.id }) });
            } catch (err) {
                return res.status(400).send({ err: "Error in register" });
            }
        });
    }

    private auth() {
        this.router.post("/auth", async (req: express.Request, res: express.Response) => {
            try {
                const user = await User.findOne({ ...req.body }).select("+password");

                if (!user) {
                    return res.status(400).send({ err: "User not exists!" });
                }
                return res.status(200).send({ user, token: this.generateToken({ id: user.id }) });
            } catch (err) {
                return res.status(400).send({ err: "Error in authenticate" });
            }
        });
    }

    private forgotPassword() {
        this.router.post("/forgotPassword", async (req: express.Request, res: express.Response) => {
            try {
                const user = await User.findOne({ ...req.body });

                if (!user) {
                    return res.status(400).send({ info: "User not found! " });
                }

                const token = crypto.randomBytes(20).toString("hex");
                const now = new Date().setHours(new Date().getHours() + 1);

                await User.findByIdAndUpdate(user.id, {
                    $set: {
                        resetPasswordToken: token,
                        resetValidToken: now,
                    },
                });

                mailer.sendMail({
                    from: user.mail,
                    to: "marlin.hvga@gmail.com",
                    template: "forgotPassword",
                    context: { token, name: user.name },
                }, (err: object) => {
                    if (err) {
                        return res.status(400).send({ err });
                    }

                    return res.status(200).send({ info: "OK!" });
                });
            } catch (err) {
                res.status(400).send({ err: "Error in forgotPassword" });
            }
        });
    }

    get Router() {
        return this.router;
    }
}
