import { Request, Response, Router } from "express";
import Content from "../models/Content";
import Http from "../utils/decorators/Http";

const http = new Http(Router());

class FilterController {
    public router: Router = http.router;

    @http.Post("/")
    public async filterContent(req: Request, res: Response) {
        try {
            const contents = await Content.find({
                project: req.headers.keyproject,
            });
            const filtered = contents.map((content) => {
                if (content.content) {
                    const filters = Object.entries(req.body) as string[][];
                    const tests = filters.map(
                        (filter) => {
                            if (content.content[filter[0]] && content.content[filter[0]] === filter[1]) {
                                return true;
                            }
                            return false;
                        },
                    );

                    if (!tests.includes(false)) { return content; }
                }
            }).filter((value) => value != null);

            res.send(filtered);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default new FilterController().router;
