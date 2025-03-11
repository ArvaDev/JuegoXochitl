import { Request, Response } from "express";
import UserModel from "./user.model";
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
