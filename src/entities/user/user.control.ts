import { Request, Response } from "express";
import UserModel from "./user.model";
import RoomModel from "../room/room.model";
import { generateId } from "../../utils/idgenerator";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newUser = new UserModel({ name, score: 0, user_id: generateId(6) });
        await newUser.save();

        res.status(201).json({ message: "Usuario creado", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error: error });
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ message: "Usuarios encontrados", users });
    } catch (error) {
        res.status(500).json({ message: "Error al buscar los usuarios", error: error });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await UserModel.findOne({user_id: id});
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return 
        }
        res.status(200).json({message: "Usuario encontrado", data: user})
    } catch(error) {
        res.status(500).json({message: "Error al conseguir usuario", error: error})
    }
}

export const joinRoom = async (req: Request, res: Response) => { 
    try {
        const { user_id, room_id } = req.body;

        const user = await UserModel.findOne({ user_id });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return
        }

        const room: any = await RoomModel
            .findOne({ id_room: room_id })
            .populate("users");

        if (!room) {
            res.status(404).json({ message: "Sala no encontrada" });
            return
        }

        room.users.push(user);
        await room.save();
        res.status(200).json({ message: "Usuario unido a la sala", room });

    } catch(error) {
        res.status(500).json({ message: "Error al unirse a la sala", error: error });
        
    }
}