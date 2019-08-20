import { Request, Response, Router } from "express";
import User from "./../models/User";

import { Get, Put, Delete, router, Post } from "./../utils/decorators";

interface IRequest extends Request {
    userId: string;
}

export default class UserController {
    private router: Router = router;

    @Post("/recovery")
    public async recovery(req: IRequest, res: Response) {
        try {
            const { password } = req.body;

            const user = await User.findOne({ _id: req.userId });

            user.password = password;

            await user.save();

            return res.status(200);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    get Router() {
        return this.router;
    }
}
