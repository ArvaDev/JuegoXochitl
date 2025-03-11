import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/regexGame";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {});
        console.log("🟢 Conectado a MongoDB");

    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}