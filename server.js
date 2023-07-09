//packages imports
import express from "express";
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from "morgan";
import 'express-async-errors';

//files imports
import connectDb from "./config/db.js";

//middlewares import
import errorMiddleware from './middlewares/errorMiddleware.js';

//routes import
import authRoutes from './routes/authRoutes.js';

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

//routes
app.use('/api/v1/auth', authRoutes)

//Validation middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 8082

//listen
app.listen(PORT, () => {
    console.log(`Node server is running on port ${PORT} in ${process.env.ENV_MODE} mode`.red)
})
