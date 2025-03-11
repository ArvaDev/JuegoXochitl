import initApi from "./api/express";
import { connectDB } from "./db/connectMongo";
import webSocket from "./web/websocket.server";

connectDB();
initApi();
webSocket();