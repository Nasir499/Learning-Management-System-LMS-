import jwt from "jsonwebtoken";
import AppError from "../utils/error.util.js";

const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookie;

    if (!token) {
        return next(new AppError("Unauthenticated,Please login again ", 400))

    }
    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next()

}

export {
    isLoggedIn
}