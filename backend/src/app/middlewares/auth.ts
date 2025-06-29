import config from "../config"
import { APPerror } from "../errors/AppError"
import User from "../modules/User/User.model"
import catchAsync from "../utils/catchAsync"
import httpStatus from "http-status"
import { JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"

const auth = () => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        const bearer = req.headers.authorization?.split(' ')[0];
        if (bearer !== 'Bearer') {
            throw new APPerror(httpStatus.UNAUTHORIZED, 'You are not authorized')
        }

        if (!token) {
            throw new APPerror(httpStatus.UNAUTHORIZED, 'You are not authorized')
        }
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        const { email } = decoded;
        const user = await User.isUserExists(email);
        if (!user) {
            throw new APPerror(httpStatus.NOT_FOUND, "User not found");
        }
        req.user = { id: user._id, email: user.email, name: user.name };
        next()
    })
}
export default auth