import mongoose from "mongoose";
export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGDB_URL!,{
            dbName: 'new',
        })
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        connection.on("error", (err) => {
            console.log("MongoDB connection error: ", err);
            process.exit(1);
        });
    } catch (error) {
        throw new Error("Database connection failed");
        console.log(error)
    }
}