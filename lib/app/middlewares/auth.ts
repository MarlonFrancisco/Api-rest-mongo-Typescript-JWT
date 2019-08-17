import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import configs from "../../configs";

interface IRequestAuth extends Request {
    userId: string;
    headers: {
        authorization: string;
    };
}

interface IDecoded {
    id: string;
}

export default (req: IRequestAuth, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).send({ err: "Token no provider" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(400).send({ err: "Token error" });
    }

    const [schema, token] = parts;

    if (!/^Bearer$/.test(schema)) {
        return res.status(400).send({ err: "Token invalid!" });
    }

    jwt.verify(token, configs.hash, (err: object, decoded: IDecoded) => {
        if (err) {
            return res.status(400).send({ err });
        }

        req.userId = decoded.id;
        next();
    });
};
