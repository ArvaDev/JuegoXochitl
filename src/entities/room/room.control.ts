import { Response, Request } from "express";
import UserModel from "../user/user.model";
import RoomModel from "./room.model";
import { generateId } from "../../utils/idgenerator";

export const createRoom = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;
        const user = await UserModel.findOne({ user_id: user_id });
        if  (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return 
        }
        const idRoom = generateId(6);
        const newRoom = new RoomModel({ id_room: idRoom, users: [user], master: user });
        await newRoom.save();
        res.status(200).json({ message: "Sala creada", room: newRoom });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la sala", error: error });
    }
}

export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms: any = await RoomModel.find();
        console.log(rooms[0].users);
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las salas", error: error });
    }
}