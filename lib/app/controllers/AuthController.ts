import { Router, Request, Response } from "express";
import { Post, router } from "./../utils/decorators";
import User from "./../models/User";
import TransportMailer from "./../../mail";
import generateToken from "./../utils/generateToken";
import "dotenv/config";
import { verify } from "jsonwebtoken";

export default class AuthController {
    private router: Router = router;

    @Post("/register")
    public async register(req: Request, res: Response) {
        try {
            let user = await User.findOne({ ...req.body });

            if (user) {
                return res.status(400).send("User exists");
            }

            const mail = new TransportMailer();
            user = await User.create({ ...req.body });

            if (!user) {
                return res.status(400).send({ err: "User not was created! " });
            }

            const status = await mail.prepareMail("welcome", user.email, {
                "%%user%%": user.name,
                "%%address%%": process.env.BASE_URL,
            });

            return res
                .status(200)
                .send({ user, token: generateToken({ id: user.id }), status });
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Post("/login")
    public async auth(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email, password }).select(
                "+password",
            );

            if (!user) {
                return res.status(400).send({ err: "User not exists!" });
            }
            return res
                .status(200)
                .send({ user, token: generateToken({ id: user.id }) });
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Post("/requestRecovery")
    public async requestRecovery(req: Request, res: Response) {
        try {
            const mail = new TransportMailer();
            const user = await User.findOne({ ...req.body });

            if (!user) {
                return res.status(400).send({ info: "User not found! " });
            }

            const token = generateToken({ id: user._id });

            const status = await mail.prepareMail(
                "forgotpassword",
                user.email,
                {
                    "%%user%%": user.name,
                    "%%address%%": `${process.env.BASE_URL}?token=${token}`,
                },
            );

            return res.send(status);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    get Router() {
        return this.router;
    }
}
