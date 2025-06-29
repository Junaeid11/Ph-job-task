import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request{
            email: JwtPayload,
            user: JwtPayload
        }
    }
}