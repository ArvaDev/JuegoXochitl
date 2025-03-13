import { Response, Request } from "express";
import UserModel from "../user/user.model";
import RoomModel from "./room.model";
import { generateId } from "../../utils/idgenerator";

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { id, roomName } = req.body;
        const user = await UserModel.findById(id);
        if (!user) {    
            res.status(404).json({ message: "Usuario no encontrado" });
            return
        }
        const idRoom = generateId(6);
        const newRoom = new RoomModel({ id_room: idRoom, roomName: roomName, users: [user], master: user });
        await newRoom.save();
        res.status(200).json({ message: "Sala creada", room: newRoom });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la sala", error: error });
    }
}

export const getRoomByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const room: any = await RoomModel.findOne({id_room: id})
        if (!room) {
            res.status(404).json({ message: "Sala no encontrada" })
            return
        }
        res.status(200).json({ message: "Sala encontrada", room: room });

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las salas", error: error });
    }
}

export const getAllRooms = async (_req: Request, res: Response) => {
    try {
        const rooms: any = await RoomModel.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las salas", error: error });
    }
}