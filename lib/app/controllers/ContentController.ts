import { Request, Response, Router } from "express";
import Content from "../models/Content";
import Http from "../utils/decorators/Http";
import Project from "../models/Project";

const http = new Http(Router());

interface IRequest extends Request {
    userId: string;
    body: any;
}

class ContentController {
    public router: Router = http.router;

    @http.Get("/")
    public async readAll(req: Request, res: Response) {
        try {
            const users = await Content.find().populate(["assignedTo", "project"]);

            return res.send(users);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @http.Get("/:id")
    public async read(req: Request, res: Response) {
        try {
            const user = await Content.findOne({
                id_: req.params.id,
            }).populate(["assignedTo"]);

            if (!user) {
                return res.status(400).send("User not found");
            }

            return res.send(user);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @http.Post("/")
    public async create(req: IRequest, res: Response) {
        try {
            const project = await Project.findById(req.body.idProject);

            if (!project) {
                return res.status(400).send("Project not found");
            }

            const content = await Content.create({
                content: req.body.content,
                publish: req.body.publish,
                project: project._id,
                assignedTo: req.userId,
            });

            if (!content) {
                return res.status(400).send("User not created");
            }

            project.contents.push(content._id);

            await project.save();
            return res.send(content);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @http.Put("/:id")
    public async update(req: Request, res: Response) {
        try {
            if (!this.contentExists(req.params.id)) {
                return res.status(400).send("User not found");
            }

            const user = await Content.findOneAndUpdate(
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

    @http.Delete("/:id")
    public async delete(req: Request, res: Response) {
        try {
            if (!this.contentExists(req.params.id)) {
                return res.status(400).send("User not found");
            }

            await Content.findByIdAndDelete(req.params.id);

            res.send(req.params.id);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    public async contentExists(id: string) {
        const content = await Content.findOne({ _id: id });
        if (!content) {
            return false;
        }
        return true;
    }
}

export default new ContentController().router;
