import { Router } from "express";
import { createRoom, getAllRooms, getRoomByID } from "./room.control";
const roomRouter = Router();

roomRouter.post("/rooms", createRoom);
roomRouter.get("/rooms", getAllRooms);
roomRouter.get("/rooms/:id", getRoomByID);

export default roomRouter;