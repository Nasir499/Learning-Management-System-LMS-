import jwt from "jsonwebtoken";
import AppError from "../utils/error.util.js";

const isLoggedIn = async (req, res, next) => {
    // const token = req.headers.authorization?.starstswith('Bearer') ? req.headers.authorization.split(' ')[1] : req.cookies.token;
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError("Unauthenticated,Please login again ", 400))

    }
    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next()

}
const authorizedRoles = (...roles)=>async (req, res, next) => {
    const currentUserRoles = req.user.role;
    if(!roles.includes(currentUserRoles)){
    return next(new AppError("Unauthorized, You don't have permission to access this resource", 403));
      }
    next();

}
const authorizedSubscriber = async (req, res, next) => {
   const subscription = req.user.subscription;
   const currUser = req.user.role;
   if(currUser !=='ADMIN' && subscription.status !== 'active'){
       return next(new AppError("Unauthorized, You don't have permission to access this resource", 403));
   }
   next();
}
export {
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
}