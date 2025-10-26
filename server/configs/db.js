import mongoose from "mongoose";

const connectDB = async () => {
    try{
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        mongoose.connection.on('connected', ()=> console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking-system`) 

        } catch (error) {
            console.log("Database connection error:", error.message);
            process.exit(1);
    }
}

export default connectDB;