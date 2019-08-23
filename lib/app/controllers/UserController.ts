import { Request, Response, Router } from "express";
import User from "./../models/User";
import { success, error } from "jsend";
import { Get, Put, Delete, router, Post } from "./../utils/decorators";

interface IRequest extends Request {
    userId: string;
    body: any;
}

export default class UserController {
    private router: Router = router;

    @Get("/")
    public async user(req: IRequest, res: Response) {
        try {
            const user = await User.findById(req.userId);

            return res.send(success(user));
        } catch (err) {
            return res.send(error(err));
        }
    }

    @Post("/recovery")
    public async recovery(req: IRequest, res: Response) {
        try {
            const { password } = req.body;

            const user = await User.findOne({ _id: req.userId });

            user.password = password;

            await user.save();

            return res.send(success(user));
        } catch (err) {
            res.send(error(err));
        }
    }

    get Router() {
        return this.router;
    }
}
