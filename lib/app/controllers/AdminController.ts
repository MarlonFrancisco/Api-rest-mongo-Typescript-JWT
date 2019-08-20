import { Request, Response, Router } from "express";
import User from "./../models/User";

import { Get, Put, Delete, router } from "./../utils/decorators";

interface IRequest extends Request {
    userId: string;
}

export default class AdminController {
    private router: Router = router;

    @Get("/")
    public async getAll(req: IRequest, res: Response) {
        try {
            const users = await User.find();

            return res.status(200).send(users);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Get("/:id")
    public async getOne(req: IRequest, res: Response) {
        try {
            const user = await User.findOne({ _id: req.params.id });

            if (!user) {
                return res.status(400).send({ error: "User not found" });
            }

            return res.status(200).send(user);
        } catch (err) {
            return res.status(400).send(err);
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

            return res.status(200).send(user);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Delete("/:id")
    public async delete(req: IRequest, res: Response) {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.status(200).send({
                info: `User deleted with sucesss ${req.params.id}`,
            });
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    get Router() {
        return this.router;
    }
}
