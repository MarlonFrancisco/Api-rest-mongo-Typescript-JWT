import { sign } from "jsonwebtoken";
import configs from "./../../configs";

export default function(params = {}) {
    return sign(params, configs.hash, {
        expiresIn: 600000,
    });
}
