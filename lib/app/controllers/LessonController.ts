import * as express from 'express';
import auth from './../middlewares/auth';
import Lessons from './../models/Lessons';

export default class LessonController {
    private router: express.Router = express.Router();

    constructor() {
        this.middlewares();
    }

    middlewares() {
        this.router.use(auth);
        this.getAll();
        this.getOne();
        this.update();
        this.delete();
    }

    getAll() {
        this.router.get("/", async (req: express.Request, res: express.Response) => {
            try {
                const users = await Lessons.find().populate("+User");

                return res.status(200).send(users);
            } catch (err) {
                return res.status(400).send({ error: "Error in get all"});
            }
        })
    }

    getOne() {
        this.router.get("/:id", async (req: express.Request, res: express.Response) => {
            try {
                const user = await Lessons.findOne({ id_: req.params.id }).populate("+User");

                if (!user)
                    return res.status(400).send({ error: "User not found"});

                return res.status(200).send(user);
            } catch (err) {
                return res.status(400).send({ error: "Error in get one"});
            }
        })
    }

    update() {
        this.router.put("/:id", async (req: express.Request, res: express.Response) => {
            try {
                if (!this.lessonExists(req.params.id))
                    return res.status(400).send({ error: "User not found"});
                
                const user = await Lessons.findOneAndUpdate({_id: req.params.id}, {
                    $set: {
                        ...req.body
                    }
                }, { new: true });

                return res.status(200).send(user);
            } catch (err) {
                return res.status(400).send({ error: "Error in Update lesson"});
            }
        })
    }

    delete() {
        this.router.put("/:id", async (req: express.Request, res: express.Response) => {
            try {  
                
                if (!this.lessonExists(req.params.id))
                    return res.status(400).send({ error: "User not found"});

                await Lessons.findByIdAndDelete(req.params.id);

                res.status(200).send({info: `Lesson deleted with sucesss ${req.params.id}`})
            } catch (err) {
                return res.status(400).send({ error: "Error in Update lesson"});
            }
        })
    }

    async lessonExists(id: string) {
        const user = await Lessons.findOne({ _id: id });
        if (!user)  
            return false;
        return true;
    }

    get Router() {
        return this.router;
    }
}