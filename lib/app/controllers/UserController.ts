import { Request, Response, Router } from "express";
import User from "./../models/User";
import { success, error } from "jsend";
import Http from "../utils/decorators/Http";

const http = new Http(Router());

interface IRequest extends Request {
    userId: string;
    body: any;
    params: {
        id: string;
    };
}

class UserController {
    public router: Router = http.router;

    @http.Get("/")
    public async getAll(req: IRequest, res: Response) {
        try {
            const users = await User.find();

            return res.send(success(users));
        } catch (err) {
            return res.status(400).send(error(err));
        }
    }

    @http.Get("/:id")
    public async getOne(req: IRequest, res: Response) {
        try {
            const user = await User.findOne({ _id: req.params.id });

            if (!user) {
                return res.status(400).send({ error: "User not found" });
            }

            return res.send(success(user));
        } catch (err) {
            return res.status(400).send(error(err));
        }
    }

    @http.Post("/recovery")
    public async recovery(req: IRequest, res: Response) {
        try {
            const { password } = req.body;

            const user = await User.findOne({ _id: req.userId });

            user.password = password;

            await user.save();

            return res.send(success(user));
        } catch (err) {
            res.status(400).send(error(err));
        }
    }

    @http.Put("/:id")
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
            return res.status(400).send(error(err));
        }
    }

    @http.Delete("/:id")
    public async delete(req: IRequest, res: Response) {
        try {
            const user = await User.findOne(req.body);

            if (!user) {
                return res.status(400).send(error("User not found"));
            }

            await User.findByIdAndDelete(req.params.id);

            res.send(success(`User deleted with sucesss ${req.params.id}`));
        } catch (err) {
            return res.status(400).send(error(err));
        }
    }
}

export default new UserController().router;
