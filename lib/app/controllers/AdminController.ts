import { Request, Response, Router } from "express";
import User from "./../models/User";
import { success, error } from "jsend";

import { Get, Put, Delete, router } from "./../utils/decorators";

interface IRequest extends Request {
    userId: string;
    params: {
        id: string;
    };
    body: any;
}

export default class AdminController {
    private router: Router = router;

    @Get("/")
    public async getAll(req: IRequest, res: Response) {
        try {
            const users = await User.find();

            return res.send(success(users));
        } catch (err) {
            return res.send(error(err));
        }
    }

    @Get("/:id")
    public async getOne(req: IRequest, res: Response) {
        try {
            const user = await User.findOne({ _id: req.params.id });

            if (!user) {
                return res.status(400).send({ error: "User not found" });
            }

            return res.send(success(user));
        } catch (err) {
            return res.send(error(err));
        }
    }

    @Put("/:id")
    public async update(req: IRequest, res: Response) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        ...req.body,
                    },
                },
                { new: true },
            );

            return res.send(success(user));
        } catch (err) {
            return res.send(error(err));
        }
    }

    @Delete("/:id")
    public async delete(req: IRequest, res: Response) {
        try {
            const user = await User.findOne(req.body);

            if (!user) {
                return res.send(error("User not found"));
            }

            await User.findByIdAndDelete(req.params.id);

            res.send(success(`User deleted with sucesss ${req.params.id}`));
        } catch (err) {
            return res.send(error(err));
        }
    }

    get Router() {
        return this.router;
    }
}
