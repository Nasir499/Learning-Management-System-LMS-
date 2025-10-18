import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoute from "./routes/user.routes.js"
import errorMiddleware   from "./middlewares/error.middleware.js";
import courseRoute from "./routes/course.routes.js"
import paymentRoute from "./routes/payment.routes.js"
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials: true
}))
app.use(cookieParser())

app.use(morgan("dev"))



//Routes
app.use('/api/v1/user',userRoute)
app.use('/api/v1/course',courseRoute)
app.use('/api/v1/payments',paymentRoute)

// app.all('*', (req, res, next) => {
//     res.status(404).json({
//         success:false,
//         message:"Oops!! 404 Page not found"
//     })
//     next()
// })

app.use(errorMiddleware)



export default app;