import { Request, Response, Router } from "express";

export const router = Router();

export function Post(url: string) {
    return (target: object, name: string, description: any) => {
        router.post(url, (req: Request, res: Response) => {
            description.value(req, res);
        });
    };
}

export function Get(url: string) {
    return (target: object, name: string, description: any) => {
        router.get(url, (req: Request, res: Response) => {
            description.value(req, res);
        });
    };
}

export function Put(url: string) {
    return (target: object, name: string, description: any) => {
        router.put(url, (req: Request, res: Response) => {
            description.value(req, res);
        });
    };
}

export function Delete(url: string) {
    return (target: object, name: string, description: any) => {
        router.delete(url, (req: Request, res: Response) => {
            description.value();
        });
    };
}
