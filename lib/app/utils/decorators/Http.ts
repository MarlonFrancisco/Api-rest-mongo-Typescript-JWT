import { Request, Response, Router } from "express";

export default class Http {
    public router: Router;

    constructor(route: Router) {
        this.router = route;
    }

    public Get(url: string) {
        return (target: object, name: string, description: any) => {
            this.router.get(url, (req: Request, res: Response) => {
                description.value(req, res);
            });
        };
    }

    public Post(url: string) {
        return (target: object, name: string, description: any) => {
            this.router.post(url, (req: Request, res: Response) => {
                description.value(req, res);
            });
        };
    }

    public Put(url: string) {
        return (target: object, name: string, description: any) => {
            this.router.put(url, (req: Request, res: Response) => {
                description.value(req, res);
            });
        };
    }

    public Delete(url: string) {
        return (target: object, name: string, description: any) => {
            this.router.delete(url, (req: Request, res: Response) => {
                description.value(req, res);
            });
        };
    }
}
