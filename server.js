//packages imports
import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from "morgan";
import 'express-async-errors';
import cookieSession from "cookie-session";

//files imports
import connectDb from "./config/db.js";

//middlewares import
import errorMiddleware from './middlewares/errorMiddleware.js';

//routes import
import authRoutes from './routes/authRoutes.js';
import passport from "passport";

//config Dot env
dotenv.config();

//Mongodb connection
connectDb()

//rest object
const app = express();

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
// Session middleware
app.use(
    cookieSession({
        name: 'session',
        keys: ["swainumasankar"],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/api/v1/auth', authRoutes)

//Validation middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 8082

//listen
app.listen(PORT, () => {
    console.log(`Node server is running on port ${PORT} in ${process.env.ENV_MODE} mode`.red)
})
