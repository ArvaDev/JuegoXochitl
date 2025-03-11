import { Router } from "express";
import { createRoom, getAllRooms } from "./room.control";
const roomRouter = Router();

roomRouter.post("/rooms", createRoom);
roomRouter.get("/rooms", getAllRooms);

export default roomRouter;