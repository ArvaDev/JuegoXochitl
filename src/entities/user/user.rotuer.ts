import { Router } from "express";
import { createUser, getUsers, joinRoom, getUserById } from "./user.control";

const userRouter = Router();

userRouter.post("/users", createUser); // primario
userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserById); // primario
userRouter.post("/users/join", joinRoom); // primario

export default userRouter;
