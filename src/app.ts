import initApi from "./api/express";
import { connectDB } from "./db/connectMongo";

connectDB();
initApi();