import { Request, Response, Router } from "express";
import Lessons from "../models/Lessons";
import { success, error } from "jsend";

import { Get, Put, Delete, router } from "../utils/decorators";

export default class ContentController {
    private router: Router = router;

    @Get("/")
    public async getAll(req: Request, res: Response) {
        try {
            const users = await Lessons.find().populate("+User");

            return res.send(success(users));
        } catch (err) {
            return res.send(error(err));
        }
    }

    @Get("/:id")
    public async getOne(req: Request, res: Response) {
        try {
            const user = await Lessons.findOne({ id_: req.params.id }).populate(
                "+User",
            );

            if (!user) {
                return res.send(error("User not found"));
            }

            return res.send(success(user));
        } catch (err) {
            return res.send(error(err));
        }
    }

    @Put("/:id")
    public async update(req: Request, res: Response) {
        try {
            if (!this.lessonExists(req.params.id)) {
                return res.send(error("User not found"));
            }

            const user = await Lessons.findOneAndUpdate(
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
    public async delete(req: Request, res: Response) {
        try {
            if (!this.lessonExists(req.params.id)) {
                return res.send(error("User not found"));
            }

            await Lessons.findByIdAndDelete(req.params.id);

            res.send(success(req.params.id));
        } catch (err) {
            return res.send(error(err));
        }
    }

    public async lessonExists(id: string) {
        const user = await Lessons.findOne({ _id: id });
        if (!user) {
            return false;
        }
        return true;
    }

    get Router() {
        return this.router;
    }
}
