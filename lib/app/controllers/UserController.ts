import { Request, Response, Router } from "express";
import User from "./../models/User";
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

    @http.Get("/all")
    public async getAll(req: IRequest, res: Response) {
        try {
            const users = await User.find().populate({
                path: "member",
                populate: ["members", {
                    path: "contents",
                    populate: "assignedTo",
                }],
            });

            return res.send(users);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @http.Get("/")
    public async getOne(req: IRequest, res: Response) {
        try {
            const user = await User.findOne({ _id: req.userId }).populate({
                path: "member",
                populate: ["members", {
                    path: "contents",
                    populate: "assignedTo",
                }],
            });

            if (!user) {
                return res.status(400).send({ error: "User not found" });
            }

            return res.send(user);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @http.Post("/recovery")
    public async recovery(req: IRequest, res: Response) {
        try {
            const { password } = req.body;

            const user = await User.findOne({ _id: req.userId });

            user.password = password;

            await user.save();

            return res.send(user);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    @http.Put("/")
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

            return res.send(user);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @http.Delete("/")
    public async delete(req: IRequest, res: Response) {
        try {
            const user = await User.findOne(req.body);

            if (!user) {
                return res.status(400).send("User not found");
            }

            await User.findByIdAndDelete(req.params.id);

            res.send(`User deleted with sucesss ${req.params.id}`);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default new UserController().router;
