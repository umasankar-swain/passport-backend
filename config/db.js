import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongoDB database ${mongoose.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`MongoDB Error ${error}`.bgRed.white)
    }
}

export default connectDb