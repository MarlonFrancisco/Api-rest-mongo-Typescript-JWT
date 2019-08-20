import { sign } from "jsonwebtoken";
import "dotenv/config";

export default function(params = {}) {
    return sign(params, process.env.HASH, {
        expiresIn: 10000,
    });
}
