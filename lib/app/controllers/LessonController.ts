import { Request, Response, Router } from "express";
import auth from "./../middlewares/auth";
import Lessons from "./../models/Lessons";

import { Get, Put, Delete, router } from "./../utils/decorators";

export default class LessonController {
    private router: Router = router;

    @Get("/")
    public async getAll(req: Request, res: Response) {
        try {
            const users = await Lessons.find().populate("+User");

            return res.status(200).send(users);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Get("/:id")
    public async getOne(req: Request, res: Response) {
        try {
            const user = await Lessons.findOne({ id_: req.params.id }).populate(
                "+User",
            );

            if (!user) {
                return res.status(400).send({ error: "User not found" });
            }

            return res.status(200).send(user);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Put("/:id")
    public async update(req: Request, res: Response) {
        try {
            if (!this.lessonExists(req.params.id)) {
                return res.status(400).send({ error: "User not found" });
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

            return res.status(200).send(user);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @Delete("/:id")
    public async delete(req: Request, res: Response) {
        try {
            if (!this.lessonExists(req.params.id)) {
                return res.status(400).send({ error: "User not found" });
            }

            await Lessons.findByIdAndDelete(req.params.id);

            res.status(200).send({
                info: `Lesson deleted with sucesss ${req.params.id}`,
            });
        } catch (err) {
            return res.status(400).send(err);
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
