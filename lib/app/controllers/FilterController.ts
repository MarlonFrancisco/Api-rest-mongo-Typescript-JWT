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

            const filtered = (Object.entries(req.body) as string[][]).map((fields: string[]) => {
                return contents.filter(
                    (content) =>
                        content.content &&
                        content.content[fields[0]] &&
                        content.content[fields[0]] === fields[1],
                );
            });

            res.send(filtered);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default new FilterController().router;
