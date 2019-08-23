import { Router, Request, Response } from "express";
import { Post, router } from "./../utils/decorators";
import User from "./../models/User";
import TransportMailer from "./../../mail";
import generateToken from "./../utils/generateToken";
import "dotenv/config";
import { success, error } from "jsend";

export default class AuthController {
    private router: Router = router;

    @Post("/register")
    public async register(req: Request, res: Response) {
        try {
            let user = await User.findOne({ ...req.body });

            if (user) {
                return res.send(error("User exists"));
            }

            const mail = new TransportMailer();
            user = await User.create({ ...req.body });

            if (!user) {
                return res.send(error("User not was created!"));
            }

            const status = await mail.prepareMail("welcome", user.email, {
                "%%user%%": user.name,
                "%%address%%": process.env.BASE_URL,
            });

            return res
                .send(success({ user, token: `Bearer ${generateToken({ id: user.id })}`, status }));
        } catch (err) {
            return res.send(error(err));
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
                return res.send(error("User not exists!"));
            }
            return res
                .send(success({ user, token: `Bearer ${generateToken({ id: user.id })}` }));
        } catch (err) {
            return res.send(error(err));
        }
    }

    @Post("/recovery")
    public async recovery(req: Request, res: Response) {
        try {
            const mail = new TransportMailer();
            const user = await User.findOne({ ...req.body });

            if (!user) {
                return res.send(error("User not found! "));
            }

            const token = generateToken({ id: user._id });

            const status = await mail.prepareMail(
                "forgotpassword",
                user.email,
                {
                    "%%user%%": user.name,
                    "%%address%%": `${process.env.BASE_URL}?token=Bearer ${token}`,
                },
            );

            return res.send(success(status));
        } catch (err) {
            return res.send(error(err));
        }
    }

    get Router() {
        return this.router;
    }
}
