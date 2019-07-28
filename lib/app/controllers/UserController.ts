import * as express from "express";
import Auth from "./../middlewares/auth";
import User from "./../models/User";

export default class UserController {
    private router: express.Router = express.Router();

    constructor() { 
        this.middlewares();
        this.getAll();
    }

    middlewares() {
        this.router.use(Auth);
        this.getAll();
        this.getOne();
        this.delete();
        this.update();
    }

    getAll() {
        this.router.get("/", async (req: express.Request, res: express.Response) => {
            try {
                const users = await User.find();

                return res.status(200).send(users);
            } catch (err) {
                return res.status(400).send({ error: "Error in getAll users"})
            }
        })
    }

    getOne() {
        this.router.get('/:id', async (req: express.Request, res: express.Response) => {
            try {
                const user = await User.findOne({ _id: req.params.id });

                if (!user)
                    return res.status(400).send({ error: "User not found"});
                
                return res.status(200).send(user);
            } catch (err) {
                return res.status(400).send({error: "Error in get one user"})
            }
        });
    }

    update() {
        this.router.put("/:id", async (req: express.Request, res: express.Response) => {
            try {
                const user = await User.findOneAndUpdate({_id: req.params.id}, {
                    $set: {
                        ...req.body
                    }
                }, { new: true });

                return res.status(200).send(user);
            } catch (err) {
                return res.status(400).send({error: "Error in update"})
            }
        });
    }

    delete() {
        this.router.delete("/:id", async (req: express.Request, res: express.Response) => {
            try {
                await User.findByIdAndDelete(req.params.id);

                res.status(200).send({info: `User deleted with sucesss ${req.params.id}`})
            } catch (err) {
                return res.status(400).send({ error: "Error in delete"});
            }
        });
    }

    get Router() {
        return this.router;
    }
}