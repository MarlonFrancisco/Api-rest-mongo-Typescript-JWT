import { Router, Request, Response } from "express";
import Http from "../utils/decorators/Http";
import Project from "../models/Project";
import User from "../models/User";

const http = new Http(Router());

class ProjectController {
    public router: Router = http.router;

    @http.Get("/")
    public async readAll(req: Request, res: Response) {
        try {
            const projects = await Project.find().populate([
                "members",
                "contents",
            ]);

            if (!projects) {
                return res.status(400).send("Empty projects");
            }

            return res.send(projects);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @http.Get("/:id")
    public async read(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const project = await Project.findById(id).populate([
                "members",
                "contents",
            ]);

            if (!project) {
                return res.status(400).send("Project not found");
            }

            return res.send(project);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @http.Post("/")
    public async create(req: Request, res: Response) {
        try {
            let project = await Project.findOne({ ...req.body });

            if (project) {
                return res.status(400).send("Project exists");
            }

            project = await Project.create({ ...req.body });
            if (!project) {
                return res.status(400).send("Try again");
            }
            return res.send(project);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @http.Put("/:idProject")
    public async addMember(req: Request, res: Response) {
        try {
            const { idProject } = req.params;
            const { idUser } = req.body;

            const user = await User.findById(idUser);

            if (!user) {
                return res.status(400).send("User not found");
            }

            const project = await Project.findById(idProject);

            if (!project) {
                return res.status(400).send("Project not found");
            }

            user.member.push(project._id);
            project.members.push(user._id);

            await project.save();
            await user.save();

            return res.send(project);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    @http.Delete("/:id")
    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const project = await Project.findById(id);

            if (!project) {
                return res.status(400).send("Project not found");
            }

            await Project.findByIdAndDelete(id);

            return res.send("user deleted");
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default new ProjectController().router;
