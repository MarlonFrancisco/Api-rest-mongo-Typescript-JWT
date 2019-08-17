import { Router, Request, Response } from "express";
import * as crypto from "crypto";
import User from "./../models/User";
import TransportMailer from "./../../mail";
import generateToken from "./../utils/generateToken";

import { Post, router } from "./../utils/decorators";

export default class AuthController {
    private router: Router = router;

    @Post("/register")
    public async register(req: Request, res: Response) {
        try {
            const mail = new TransportMailer();
            const user = await User.create({ ...req.body });

            if (!user) {
                return res.status(400).send({ err: "User not was created! " });
            }

            const status = await mail.prepareMail("welcome", user.email, {
                "%%user%%": user.name,
                "%%address%%": "https://managecontent-82d15.web.app/",
            });

            return res.status(200).send({ user, token: generateToken({ id: user.id }), status });
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Post("/login")
    public async auth(req: Request, res: Response) {
        try {
            const user = await User.findOne({ ...req.body }).select("+password");

            if (!user) {
                return res.status(400).send({ err: "User not exists!" });
            }
            return res.status(200).send({ user, token: generateToken({ id: user.id }) });
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Post("/recovery")
    public async forgotPassword(req: Request, res: Response) {
            try {
                const mail = new TransportMailer();
                const user = await User.findOne({ ...req.body });

                if (!user) {
                    return res.status(400).send({ info: "User not found! " });
                }

                const password = crypto.randomBytes(3).toString("hex");

                await User.findByIdAndUpdate(user.id, {
                    $set: {
                        password,
                    },
                });

                const status = await mail.prepareMail("forgotpassword", user.email, {
                    "%%user%%": user.name,
                    "%%pass%%": `${user.name}${password}`,
                    "%%address%%": "https://managecontent-82d15.web.app/",
                });

                res.send(status);
            } catch (err) {
                res.status(400).send(err);
            }
    }

    get Router() {
        return this.router;
    }
}
